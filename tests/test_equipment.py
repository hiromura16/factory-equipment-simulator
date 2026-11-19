import asyncio
import socket
import struct
import pytest
from models import Spec, Profile, Register
from config import FieldRule
from store import Store
from controller import Controller
from equipment import EquipmentDriver


def port():
    with socket.socket() as s:
        s.bind(("127.0.0.1", 0))
        return s.getsockname()[1]


def test_actual_opcua_and_modbus_read_subscribe_and_readonly(tmp_path):
    from asyncua import Client
    from pymodbus.client import AsyncModbusTcpClient

    async def run():
        store = Store(tmp_path)
        c = Controller("equipment", store)
        c.spec = Spec()
        c.spec.equipment.devices = 1
        c.spec.generator.fields.append(
            FieldRule(
                name="active", data_type="boolean", generator="constant", value=True
            )
        )
        c.spec.equipment.registers.extend(
            [
                Register(field="active", area="coil", address=3, encoding="bool"),
                Register(field="active", area="discrete", address=9, encoding="bool"),
                Register(field="value", area="input", address=10),
            ]
        )
        c.profile = Profile(opc_port=port(), modbus_port=port())
        c.ds = "test"
        d = EquipmentDriver(c)
        await d.start()
        try:
            await d.step(0)
            async with Client(
                f"opc.tcp://127.0.0.1:{c.profile.opc_port}/factory/"
            ) as client:
                ns = await client.get_namespace_index(c.profile.namespace_uri)
                node = client.get_node(f"ns={ns};s=Device001.value")
                value = await node.read_value()
                assert isinstance(value, float)
                received = []

                class H:
                    def datachange_notification(self, node, value, data):
                        received.append(value)

                sub = await client.create_subscription(50, H())
                await sub.subscribe_data_change(node)
                await d.step(1)
                await asyncio.sleep(0.2)
                assert received
                with pytest.raises(Exception):
                    await node.write_value(123.0)
                await sub.delete()
            mc = AsyncModbusTcpClient("127.0.0.1", port=c.profile.modbus_port)
            assert await mc.connect()
            result = await mc.read_holding_registers(0, count=2, device_id=1)
            assert not result.isError(), result
            decoded = struct.unpack(
                ">f", b"".join(v.to_bytes(2, "big") for v in result.registers)
            )[0]
            assert abs(decoded - d.values[1]["value"]) < 0.001
            coil = await mc.read_coils(3, count=1, device_id=1)
            discrete = await mc.read_discrete_inputs(9, count=1, device_id=1)
            inputs = await mc.read_input_registers(10, count=2, device_id=1)
            assert not coil.isError() and coil.bits[0] is True
            assert not discrete.isError() and discrete.bits[0] is True
            assert not inputs.isError() and inputs.registers == result.registers
            denied = await mc.write_register(0, 1, device_id=1)
            assert denied.isError()
            mc.close()
        finally:
            await d.close()

    asyncio.run(run())


def test_opcua_username_requires_trusted_certificate_and_encrypted_channel(
    tmp_path, monkeypatch
):
    from cryptography import x509
    from cryptography.x509.oid import NameOID, ExtendedKeyUsageOID
    from cryptography.hazmat.primitives.asymmetric import rsa
    from cryptography.hazmat.primitives import serialization, hashes
    from datetime import datetime, timezone, timedelta
    from asyncua import Client
    from asyncua.crypto.security_policies import SecurityPolicyBasic256Sha256

    folder = tmp_path / "certs"
    folder.mkdir()
    monkeypatch.setenv("CONNECTION_FILES_DIR", str(folder))

    def certificate(name, uri):
        key = rsa.generate_private_key(public_exponent=65537, key_size=2048)
        subject = x509.Name([x509.NameAttribute(NameOID.COMMON_NAME, name)])
        now = datetime.now(timezone.utc)
        cert = (
            x509.CertificateBuilder()
            .subject_name(subject)
            .issuer_name(subject)
            .public_key(key.public_key())
            .serial_number(x509.random_serial_number())
            .not_valid_before(now - timedelta(minutes=1))
            .not_valid_after(now + timedelta(days=1))
            .add_extension(
                x509.SubjectAlternativeName(
                    [x509.UniformResourceIdentifier(uri), x509.DNSName("localhost")]
                ),
                False,
            )
            .add_extension(
                x509.ExtendedKeyUsage(
                    [ExtendedKeyUsageOID.CLIENT_AUTH, ExtendedKeyUsageOID.SERVER_AUTH]
                ),
                False,
            )
            .sign(key, hashes.SHA256())
        )
        (folder / (name + ".pem")).write_bytes(
            cert.public_bytes(serialization.Encoding.PEM)
        )
        (folder / (name + "-key.pem")).write_bytes(
            key.private_bytes(
                serialization.Encoding.PEM,
                serialization.PrivateFormat.PKCS8,
                serialization.NoEncryption(),
            )
        )

    certificate("server", "urn:factory:equipment:simulator")
    certificate("client", "urn:test:client")

    async def run():
        store = Store(tmp_path / "secure")
        c = Controller("equipment", store)
        c.spec = Spec()
        c.spec.equipment.devices = 1
        c.profile = Profile(
            opc_port=port(),
            modbus_enabled=False,
            opc_auth="username",
            opc_username="reader",
            opc_password="secure-test-password",
            opc_security="sign_encrypt",
            certificate_file="server.pem",
            private_key_file="server-key.pem",
            trusted_client_certificates=["client.pem"],
        )
        c.ds = "secure"
        d = EquipmentDriver(c)
        await d.start()
        try:
            client = Client(f"opc.tcp://127.0.0.1:{c.profile.opc_port}/factory/")
            client.application_uri = "urn:test:client"
            client.set_user("reader")
            client.set_password("secure-test-password")
            await client.set_security(
                SecurityPolicyBasic256Sha256,
                str(folder / "client.pem"),
                str(folder / "client-key.pem"),
                server_certificate=str(folder / "server.pem"),
            )
            async with client:
                ns = await client.get_namespace_index(c.profile.namespace_uri)
                assert isinstance(
                    await client.get_node(f"ns={ns};s=Device001.value").read_value(),
                    float,
                )
        finally:
            await d.close()

    asyncio.run(run())

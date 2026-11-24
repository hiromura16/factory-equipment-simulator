"""設備の公開値を、ネットワーク待受なしで確認する。"""

from fastapi.testclient import TestClient

from controller import Controller
from models import Spec
from studio import create_app


def test_protocol_mapping_without_start(monkeypatch):
    """バイト順と範囲外の診断を、開始しないAPIで検証する。"""

    def forbidden(*_args, **_kwargs):
        """プレビューは実行コントローラーを起動してはいけない。"""
        raise AssertionError("プレビューからの開始は許可されません")

    monkeypatch.setattr(Controller, "start", forbidden)
    spec = Spec.model_validate(
        {
            "generator": {
                "start_sequence": 7,
                "fields": [
                    {
                        "name": "value",
                        "data_type": "integer",
                        "generator": "constant",
                        "value": 0x12345678,
                    }
                ],
            },
            "equipment": {
                "registers": [
                    {
                        "field": "value",
                        "address": 8,
                        "encoding": "uint32",
                        "byte_order": "little",
                        "word_order": "little",
                    },
                    {"field": "value", "address": 0, "encoding": "uint16"},
                ]
            },
        }
    )
    with TestClient(create_app("equipment")) as client:
        reply = client.post("/api/preview", json=spec.model_dump(mode="json"))
        assert reply.status_code == 200, reply.text
        body = reply.json()
        mapping = body["protocol_mapping"]
        assert body["writes"] is False
        assert body["records"][0]["value"] == 0x12345678
        assert mapping["device_id"] == 1
        assert mapping["opc_ua_identifiers"] == ["Device001.value"]
        assert mapping["modbus_registers"][0]["address"] == 8
        assert mapping["modbus_registers"][0]["values"] == [0x7856, 0x3412]
        assert mapping["modbus_registers"][1]["values"] is None
        assert "範囲" in mapping["modbus_registers"][1]["status"]

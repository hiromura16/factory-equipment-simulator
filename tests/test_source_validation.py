"""機器のデータ定義とModbus割当の参照を実行前に検査する。"""

import pytest
from fastapi.testclient import TestClient
from studio import create_app


@pytest.mark.parametrize("field", ["typo", "status"])
def test_invalid_modbus_field_does_not_allocate_an_execution(field):
    app = create_app("equipment")
    spec = {"equipment": {"registers": [{"field": field, "encoding": "float32"}]}}
    with TestClient(app) as client:
        for path in ("/api/preview", "/api/presets/bad-mapping", "/api/start"):
            reply = client.post(path, json=spec)
            assert reply.status_code == 422 and field in reply.text
        assert app.state.store.meta("desired") is None
        assert client.get("/api/state").json()["status"] == "stopped"


def test_modbus_text_with_explicit_encoding_dictionary_remains_supported():
    spec = {
        "equipment": {
            "registers": [
                {
                    "field": "status",
                    "encoding": "uint16",
                    "enum_values": {"ok": 0, "warning": 1, "stopped": 2},
                },
            ]
        }
    }
    with TestClient(create_app("equipment")) as client:
        response = client.post("/api/preview", json=spec)
        assert response.status_code == 200, response.text
        assert (
            response.json()["protocol_mapping"]["modbus_registers"][0]["values"]
            is not None
        )


def test_opc_only_profile_allows_custom_fields_without_modbus_mappings():
    app = create_app("equipment")
    with TestClient(app) as client:
        response = client.post(
            "/api/profiles",
            json={"id": "opc-only", "modbus_enabled": False, "opc_enabled": True},
        )
        assert response.status_code == 200, response.text
        spec = {
            "profile_id": "opc-only",
            "generator": {
                "fields": [{"name": "custom_metric", "data_type": "integer"}]
            },
        }
        response = client.post("/api/preview", json=spec)
        assert response.status_code == 200, response.text
        mapping = response.json()["protocol_mapping"]
        assert mapping["opc_ua_identifiers"] == ["Device001.custom_metric"]
        assert mapping["modbus_registers"] == []
        assert client.post("/api/presets/custom-opc", json=spec).status_code == 200

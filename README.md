# 設備サーバー模擬 / OPC UA・Modbus TCP

[コードの読み方とデータの流れ（日本語解説）](docs/code-reading-guide.md)

設備を読み取る収集クライアントのための実サーバーです。OPC UAのread・data change subscriptionと、Modbus TCPのFC1/2/3/4を実装。設定により書き込みも許可できます。

- OPC UA: `opc.tcp://HOST:3645/factory/`、namespace URI `urn:factory:equipment:simulator`、例 `ns=1;s=Device001.value`。namespace indexはURIから取得してください。
- Modbus TCP: `HOST:3646`、device ID 1〜設備数、アドレスは0始まり。既定はholding[0:2]のfloat32値、[2:4]のuint32カウンター、[4]の状態コード。
- 倍率・オフセット・符号・バイト順・ワード順・領域・アドレスを変更できます。固定NodeIdで更新し、書き込み値は次の生成tickまで保持。
- 認証はOPC UAの匿名、またはユーザー名＋Basic256Sha256 SignAndEncrypt。後者はサーバー証明書・秘密鍵と、信頼するクライアントleaf証明書の明示登録が必要です。証明書の指紋・有効期間を検証します。Modbus TCP自体にユーザー認証はありません。
- 一時切断はこのアプリのリスナーを停止・再開。Good/BadSensorFailure/UncertainLastUsableValueは実StatusCode。桁あふれ・型不正・欠測・応答遅延を検証できます。

OPC UAのAlarms & Conditions、Historical Access、実機PLC制御、SECS/GEMはこの実装の対象外です。

## カスタマイズと使い方

1. 「公開・配送プロファイル」で方式・認証・接続先を保存。
2. 「設定と実行」でプリセットを読み込み、任意項目・型・生成器・異常ルールと個別設定を編集。
3. 項目にマウスを重ねるか「?」にフォーカスすると、その場で説明を表示。「プレビュー」は通信・書き込みを行いません。設備1の初期合成値から、Modbusの0始まりアドレスと変換後の値、OPC UAの文字列NodeIdを確認できます。
4. 停止してから開始すると新しい設定を適用。実行中は設定とプロファイルの版を固定します。
5. 「この設定を保存…」からJSONを編集・検証・取り込み・書き出し・プリセット保存できます。

24種類（通常12・異常12）のJSONを同梱。[一覧と詳細](presets/README.md)には想定・生成条件・確認事項を記載しています。再生成は`uv run python build_presets.py`。初回起動で未登録IDだけを追加し、保存済み設定は更新で上書きしません。

データ型はstring/integer/number/decimal/boolean/datetime/json。record_id、uuid、sequence、分布、重み付きchoice、テンプレート、参照、四則演算、時刻、NULL率、条件上書き、固着・ドリフト・欠落等を指定できます。共有パラメーターは`$名前`、テンプレートでは先行項目を参照。任意Pythonは実行しません。異常ルールの生成位置は各ドライバーが使う論理sequenceであり、必ずしもtickやAPIの読取順ではありません。

公開契約は[Spec JSON Schema](contracts/spec.schema.json)と[Profile JSON Schema](contracts/profile.schema.json)。Spec.version=1、内包するgeneratorは既存ツールと同じRunSpec.version=2です。SQL/ファイル/ストリーム専用の一部設定は内包モデルに残っていますが、このツールのフォームでは使う項目だけを表示します。

## 起動

Python 3.12、uv、Docker Composeを使用します。

```sh
uv sync --frozen
uv run python scripts/init_local.py --env-file .env
docker compose up -d --build
```

`.env`のAPP_PORTが画面のポート、BIND_IPは既定127.0.0.1。管理画面と操作APIはログイン不要です。直接起動する場合:

```sh
DATA_DIR="$PWD/data" AUTO_START=1 uv run uvicorn app:app --host 127.0.0.1 --port 8080 --workers 1
```

1アプリ1プロセス・1実行。AUTO_START=1は初回に既定プリセットを開始。その後は保存済みの停止・実行状態を復元します。Docker再作成後もnamed volumeへ設定・データを保持。初期設定は小規模で、速度は保証値ではありません。interval_ms、batch_size、タグ/設備/件数等を増やす場合も、CPU・メモリ・容量上限を合わせて設定してください。

## 認証・データと運用

管理画面と`/api/*`はログイン不要。取得用`/source/*`の認証はプロファイルでnone/basic/bearer/api_key（X-API-Key）から別途選択します。APIへの変更操作は同一オリジンとapplication/jsonを要求。`/healthz`と`/metrics`も認証不要です。暗号化HTTPが必要な経路では既存のTLS終端を使用してください。

秘密情報はFernetで暗号化保存し、読み戻し・JSON書き出しから除外。同じ接続範囲なら未入力の資格情報を保持し、接続範囲が変われば引き継ぎません。clear_secretsで明示削除できます。証明書・秘密鍵・CAは画面からconnection-filesへ権限600で配置可能。

DATA_DIRにはsettings.sqlite3、source.key、connection-files、永続データを保存します。DBと暗号鍵は一緒にバックアップし、秘密情報として管理してください。暗号鍵だけを失うと復号できません。リポジトリへ認証情報・実行データは含めません。

ホストメモリ余力（既定6GiB）、ディスク余力2GiB、storage_limit_mbを監視し、閾値で生成を停止します。Composeは既定512MiB/1CPU、非root、read-only root、ログ上限、ホスト側の負荷ガード連携用ラベルを設定。`storage_limit_mb`はDATA_DIR配下の上限で、別マウントのログはローテーションで制限します。

`uv run pytest -q`と`uvx ruff check .`で検証。[検証記録](VALIDATION.json)に実接続と画面確認の範囲を記載しています。loopbackを既定とする汎用的な配置例と、他ソースとの組み合わせは[構成例](docs/architecture.md)を参照してください。特定環境の接続情報ではありません。

## 外部監視用の管理ラベル

Composeの管理ラベルは既定で `factory.guard.managed=true` です。外部監視側との合意が必要な場合は、非公開の配備設定で `FACTORY_GUARD_LABEL_PREFIX` を指定できます。例えば説明用の値 `synthetic-guard` を指定すると、`synthetic-guard.guard.managed=true` になります。

既存の外部監視との互換性は未確認です。変更前に監視側が照合するラベル名と影響を確認してください。この設定は既存コンテナや監視設定を自動移行せず、デプロイも行いません。

## Dokployでの配置と任意プロキシ

[Dokployの設定・ビルド・ローカル確認手順](docs/dokploy-deploy.md)を参照してください。管理画面は未認証のため、そのままインターネットへ公開しないでください。

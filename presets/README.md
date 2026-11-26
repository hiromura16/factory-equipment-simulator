# 付属のひな型一覧

迷ったときは[ひな型を選ぶ・作る](../docs/preset-guide.md)を参照してください。
アプリで保存したひな型はアプリの一覧から開きます。

| ID | 表示名 | 最大tick数 | 生成する内容 |
| --- | --- | --- | --- |
| [01-normal](#01-normal) | 正常 / 両プロトコル / 4設備 | 手動停止まで | 両プロトコル / 4設備を想定 |
| [02-normal](#02-normal) | 正常 / OPC UAのみ | 手動停止まで | 4設備を公開。プロファイルはopc-only。OPC UAは生成項目ごとのNodeId、Modbusは0始まりのアドレスを使用 |
| [03-normal](#03-normal) | 正常 / Modbusのみ | 手動停止まで | 4設備を公開。プロファイルはmodbus-only。OPC UAは生成項目ごとのNodeId、Modbusは0始まりのアドレスを使用 |
| [04-normal](#04-normal) | 正常 / 16設備 / 100ms更新 | 手動停止まで | 更新周期100ms、最大tick数無制限。 16設備を公開。プロファイルはdefault。OPC UAは生成項目ごとのNodeId、Modbusは0始まりのアドレスを使用 |
| [05-normal](#05-normal) | 正常 / 32bit整数のレジスター | 手動停止まで | sequence_no: holding[10] / uint32 / 倍率1 / 加算0 / byte=big, word=big |
| [06-normal](#06-normal) | 正常 / ワード順を反転 | 手動停止まで | value: holding[0] / float32 / 倍率1 / 加算0 / byte=big, word=little |
| [07-normal](#07-normal) | 正常 / バイト順を反転 | 手動停止まで | value: holding[0] / float32 / 倍率1 / 加算0 / byte=little, word=big |
| [08-normal](#08-normal) | 正常 / コイル / 真偽値 | 手動停止まで | active: coil[0] / bool / 倍率1 / 加算0 / byte=big, word=big |
| [09-normal](#09-normal) | 正常 / 入力レジスター | 手動停止まで | value: input[0] / float32 / 倍率1 / 加算0 / byte=big, word=big |
| [10-normal](#10-normal) | 正常 / クライアント書き込み | 手動停止まで | クライアント書き込みを想定 |
| [11-normal](#11-normal) | 正常 / 低速 / 5秒周期 | 手動停止まで | 更新周期5000ms、最大tick数無制限 |
| [12-normal](#12-normal) | 正常 / 独自のデータ項目 | 手動停止まで | temperature: holding[0] / float32 / 倍率1 / 加算0 / byte=big, word=big |
| [13-anomaly](#13-anomaly) | 異常 / 突発値 | 手動停止まで | 項目valueへset、値=250を生成位置20〜79で適用。異常後の型検証を迂回=False |
| [14-anomaly](#14-anomaly) | 異常 / ドリフト | 手動停止まで | 項目valueへramp、値=1を生成位置20〜79で適用。異常後の型検証を迂回=False |
| [15-anomaly](#15-anomaly) | 異常 / 固着 | 手動停止まで | 項目valueへfreeze、値=Noneを生成位置20〜79で適用。異常後の型検証を迂回=False |
| [16-anomaly](#16-anomaly) | 異常 / 欠測 | 手動停止まで | 項目valueへnull、値=Noneを生成位置20〜79で適用。異常後の型検証を迂回=False |
| [17-anomaly](#17-anomaly) | 異常 / 不正な型 | 手動停止まで | 項目valueへset、値='SENSOR_ERROR'を生成位置20〜79で適用。異常後の型検証を迂回=True |
| [18-anomaly](#18-anomaly) | 異常 / OPC Bad品質 | 手動停止まで | tick 5〜10でOPC品質をBadSensorFailureに変更 |
| [19-anomaly](#19-anomaly) | 異常 / OPC Uncertain品質 | 手動停止まで | tick 5〜10でOPC品質をUncertainLastUsableValueに変更 |
| [20-anomaly](#20-anomaly) | 異常 / 一時切断・復帰 | 手動停止まで | tick 5から5tickの間、両リスナーを停止して再開 |
| [21-anomaly](#21-anomaly) | 異常 / Modbus応答遅延 | 手動停止まで | Modbusアクセスへ1500msの応答遅延を追加 |
| [22-anomaly](#22-anomaly) | 異常 / Modbus桁あふれ | 手動停止まで | value: holding[10] / int16 / 倍率10000.0 / 加算0 / byte=big, word=big |
| [23-anomaly](#23-anomaly) | 異常 / 未知の状態コード | 手動停止まで | 項目statusへset、値='UNKNOWN'を生成位置10〜以降で適用。異常後の型検証を迂回=False |
| [24-anomaly](#24-anomaly) | 異常 / 更新停止に近い低速 | 手動停止まで | 更新周期60000ms、最大tick数無制限 |

## ひな型ごとの内容

### 01-normal

**正常 / 両プロトコル / 4設備** · [JSONをダウンロード](01-normal.json)

- **想定**　設備を読み出し・購読する収集クライアントの検証。両プロトコル / 4設備を想定。
- **生成内容・条件**　更新周期1000ms、最大tick数無制限。 4設備を公開。プロファイルはdefault。OPC UAは生成項目ごとのNodeId、Modbusは0始まりのアドレスを使用。 value: holding[0] / float32 / 倍率1 / 加算0 / byte=big, word=big。 sequence_no: holding[2] / uint32 / 倍率1 / 加算0 / byte=big, word=big。 status: holding[4] / uint16 / 倍率1 / 加算0 / byte=big, word=big。
- **確認事項**　OPC UAは値・StatusCode・購読通知、Modbusは領域・レジスター幅・符号・倍率・順序を照合。 書き込み許可時も次の生成tickで値を更新。数値の桁あふれはModbusのエラー応答を確認。
- **実行前**　公開・認証・送信先は別のプロファイルで指定し、保存後に停止・開始して適用。各条件はフォームとJSONで編集可能。

### 02-normal

**正常 / OPC UAのみ** · [JSONをダウンロード](02-normal.json)

- **想定**　設備を読み出し・購読する収集クライアントの検証。OPC UAのみを想定。
- **生成内容・条件**　更新周期1000ms、最大tick数無制限。 4設備を公開。プロファイルはopc-only。OPC UAは生成項目ごとのNodeId、Modbusは0始まりのアドレスを使用。 value: holding[0] / float32 / 倍率1 / 加算0 / byte=big, word=big。 sequence_no: holding[2] / uint32 / 倍率1 / 加算0 / byte=big, word=big。 status: holding[4] / uint16 / 倍率1 / 加算0 / byte=big, word=big。
- **確認事項**　OPC UAは値・StatusCode・購読通知、Modbusは領域・レジスター幅・符号・倍率・順序を照合。 書き込み許可時も次の生成tickで値を更新。数値の桁あふれはModbusのエラー応答を確認。
- **実行前**　公開・認証・送信先は別のプロファイルで指定し、保存後に停止・開始して適用。各条件はフォームとJSONで編集可能。

### 03-normal

**正常 / Modbusのみ** · [JSONをダウンロード](03-normal.json)

- **想定**　設備を読み出し・購読する収集クライアントの検証。Modbusのみを想定。
- **生成内容・条件**　更新周期1000ms、最大tick数無制限。 4設備を公開。プロファイルはmodbus-only。OPC UAは生成項目ごとのNodeId、Modbusは0始まりのアドレスを使用。 value: holding[0] / float32 / 倍率1 / 加算0 / byte=big, word=big。 sequence_no: holding[2] / uint32 / 倍率1 / 加算0 / byte=big, word=big。 status: holding[4] / uint16 / 倍率1 / 加算0 / byte=big, word=big。
- **確認事項**　OPC UAは値・StatusCode・購読通知、Modbusは領域・レジスター幅・符号・倍率・順序を照合。 書き込み許可時も次の生成tickで値を更新。数値の桁あふれはModbusのエラー応答を確認。
- **実行前**　公開・認証・送信先は別のプロファイルで指定し、保存後に停止・開始して適用。各条件はフォームとJSONで編集可能。

### 04-normal

**正常 / 16設備 / 100ms更新** · [JSONをダウンロード](04-normal.json)

- **想定**　設備を読み出し・購読する収集クライアントの検証。16設備 / 100ms更新を想定。
- **生成内容・条件**　更新周期100ms、最大tick数無制限。 16設備を公開。プロファイルはdefault。OPC UAは生成項目ごとのNodeId、Modbusは0始まりのアドレスを使用。 value: holding[0] / float32 / 倍率1 / 加算0 / byte=big, word=big。 sequence_no: holding[2] / uint32 / 倍率1 / 加算0 / byte=big, word=big。 status: holding[4] / uint16 / 倍率1 / 加算0 / byte=big, word=big。
- **確認事項**　OPC UAは値・StatusCode・購読通知、Modbusは領域・レジスター幅・符号・倍率・順序を照合。 書き込み許可時も次の生成tickで値を更新。数値の桁あふれはModbusのエラー応答を確認。
- **実行前**　公開・認証・送信先は別のプロファイルで指定し、保存後に停止・開始して適用。各条件はフォームとJSONで編集可能。

### 05-normal

**正常 / 32bit整数のレジスター** · [JSONをダウンロード](05-normal.json)

- **想定**　設備を読み出し・購読する収集クライアントの検証。32bit整数のレジスターを想定。
- **生成内容・条件**　更新周期1000ms、最大tick数無制限。 4設備を公開。プロファイルはdefault。OPC UAは生成項目ごとのNodeId、Modbusは0始まりのアドレスを使用。 sequence_no: holding[10] / uint32 / 倍率1 / 加算0 / byte=big, word=big。 sequence_no: holding[2] / uint32 / 倍率1 / 加算0 / byte=big, word=big。 status: holding[4] / uint16 / 倍率1 / 加算0 / byte=big, word=big。
- **確認事項**　OPC UAは値・StatusCode・購読通知、Modbusは領域・レジスター幅・符号・倍率・順序を照合。 書き込み許可時も次の生成tickで値を更新。数値の桁あふれはModbusのエラー応答を確認。
- **実行前**　公開・認証・送信先は別のプロファイルで指定し、保存後に停止・開始して適用。各条件はフォームとJSONで編集可能。

### 06-normal

**正常 / ワード順を反転** · [JSONをダウンロード](06-normal.json)

- **想定**　設備を読み出し・購読する収集クライアントの検証。ワード順を反転を想定。
- **生成内容・条件**　更新周期1000ms、最大tick数無制限。 4設備を公開。プロファイルはdefault。OPC UAは生成項目ごとのNodeId、Modbusは0始まりのアドレスを使用。 value: holding[0] / float32 / 倍率1 / 加算0 / byte=big, word=little。 sequence_no: holding[2] / uint32 / 倍率1 / 加算0 / byte=big, word=big。 status: holding[4] / uint16 / 倍率1 / 加算0 / byte=big, word=big。
- **確認事項**　OPC UAは値・StatusCode・購読通知、Modbusは領域・レジスター幅・符号・倍率・順序を照合。 書き込み許可時も次の生成tickで値を更新。数値の桁あふれはModbusのエラー応答を確認。
- **実行前**　公開・認証・送信先は別のプロファイルで指定し、保存後に停止・開始して適用。各条件はフォームとJSONで編集可能。

### 07-normal

**正常 / バイト順を反転** · [JSONをダウンロード](07-normal.json)

- **想定**　設備を読み出し・購読する収集クライアントの検証。バイト順を反転を想定。
- **生成内容・条件**　更新周期1000ms、最大tick数無制限。 4設備を公開。プロファイルはdefault。OPC UAは生成項目ごとのNodeId、Modbusは0始まりのアドレスを使用。 value: holding[0] / float32 / 倍率1 / 加算0 / byte=little, word=big。 sequence_no: holding[2] / uint32 / 倍率1 / 加算0 / byte=big, word=big。 status: holding[4] / uint16 / 倍率1 / 加算0 / byte=big, word=big。
- **確認事項**　OPC UAは値・StatusCode・購読通知、Modbusは領域・レジスター幅・符号・倍率・順序を照合。 書き込み許可時も次の生成tickで値を更新。数値の桁あふれはModbusのエラー応答を確認。
- **実行前**　公開・認証・送信先は別のプロファイルで指定し、保存後に停止・開始して適用。各条件はフォームとJSONで編集可能。

### 08-normal

**正常 / コイル / 真偽値** · [JSONをダウンロード](08-normal.json)

- **想定**　設備を読み出し・購読する収集クライアントの検証。コイル / 真偽値を想定。
- **生成内容・条件**　更新周期1000ms、最大tick数無制限。 4設備を公開。プロファイルはdefault。OPC UAは生成項目ごとのNodeId、Modbusは0始まりのアドレスを使用。 value: holding[0] / float32 / 倍率1 / 加算0 / byte=big, word=big。 sequence_no: holding[2] / uint32 / 倍率1 / 加算0 / byte=big, word=big。 status: holding[4] / uint16 / 倍率1 / 加算0 / byte=big, word=big。 active: coil[0] / bool / 倍率1 / 加算0 / byte=big, word=big。
- **確認事項**　OPC UAは値・StatusCode・購読通知、Modbusは領域・レジスター幅・符号・倍率・順序を照合。 書き込み許可時も次の生成tickで値を更新。数値の桁あふれはModbusのエラー応答を確認。
- **実行前**　公開・認証・送信先は別のプロファイルで指定し、保存後に停止・開始して適用。各条件はフォームとJSONで編集可能。

### 09-normal

**正常 / 入力レジスター** · [JSONをダウンロード](09-normal.json)

- **想定**　設備を読み出し・購読する収集クライアントの検証。入力レジスターを想定。
- **生成内容・条件**　更新周期1000ms、最大tick数無制限。 4設備を公開。プロファイルはdefault。OPC UAは生成項目ごとのNodeId、Modbusは0始まりのアドレスを使用。 value: input[0] / float32 / 倍率1 / 加算0 / byte=big, word=big。 sequence_no: holding[2] / uint32 / 倍率1 / 加算0 / byte=big, word=big。 status: holding[4] / uint16 / 倍率1 / 加算0 / byte=big, word=big。
- **確認事項**　OPC UAは値・StatusCode・購読通知、Modbusは領域・レジスター幅・符号・倍率・順序を照合。 書き込み許可時も次の生成tickで値を更新。数値の桁あふれはModbusのエラー応答を確認。
- **実行前**　公開・認証・送信先は別のプロファイルで指定し、保存後に停止・開始して適用。各条件はフォームとJSONで編集可能。

### 10-normal

**正常 / クライアント書き込み** · [JSONをダウンロード](10-normal.json)

- **想定**　設備を読み出し・購読する収集クライアントの検証。クライアント書き込みを想定。
- **生成内容・条件**　更新周期1000ms、最大tick数無制限。 4設備を公開。プロファイルはdefault。OPC UAは生成項目ごとのNodeId、Modbusは0始まりのアドレスを使用。 value: holding[0] / float32 / 倍率1 / 加算0 / byte=big, word=big。 sequence_no: holding[2] / uint32 / 倍率1 / 加算0 / byte=big, word=big。 status: holding[4] / uint16 / 倍率1 / 加算0 / byte=big, word=big。
- **確認事項**　OPC UAは値・StatusCode・購読通知、Modbusは領域・レジスター幅・符号・倍率・順序を照合。 書き込み許可時も次の生成tickで値を更新。数値の桁あふれはModbusのエラー応答を確認。
- **実行前**　公開・認証・送信先は別のプロファイルで指定し、保存後に停止・開始して適用。各条件はフォームとJSONで編集可能。

### 11-normal

**正常 / 低速 / 5秒周期** · [JSONをダウンロード](11-normal.json)

- **想定**　設備を読み出し・購読する収集クライアントの検証。低速 / 5秒周期を想定。
- **生成内容・条件**　更新周期5000ms、最大tick数無制限。 4設備を公開。プロファイルはdefault。OPC UAは生成項目ごとのNodeId、Modbusは0始まりのアドレスを使用。 value: holding[0] / float32 / 倍率1 / 加算0 / byte=big, word=big。 sequence_no: holding[2] / uint32 / 倍率1 / 加算0 / byte=big, word=big。 status: holding[4] / uint16 / 倍率1 / 加算0 / byte=big, word=big。
- **確認事項**　OPC UAは値・StatusCode・購読通知、Modbusは領域・レジスター幅・符号・倍率・順序を照合。 書き込み許可時も次の生成tickで値を更新。数値の桁あふれはModbusのエラー応答を確認。
- **実行前**　公開・認証・送信先は別のプロファイルで指定し、保存後に停止・開始して適用。各条件はフォームとJSONで編集可能。

### 12-normal

**正常 / 独自のデータ項目** · [JSONをダウンロード](12-normal.json)

- **想定**　設備を読み出し・購読する収集クライアントの検証。独自のデータ項目を想定。
- **生成内容・条件**　更新周期1000ms、最大tick数無制限。 4設備を公開。プロファイルはdefault。OPC UAは生成項目ごとのNodeId、Modbusは0始まりのアドレスを使用。 temperature: holding[0] / float32 / 倍率1 / 加算0 / byte=big, word=big。 sequence_no: holding[2] / uint32 / 倍率1 / 加算0 / byte=big, word=big。 status: holding[4] / uint16 / 倍率1 / 加算0 / byte=big, word=big。
- **確認事項**　OPC UAは値・StatusCode・購読通知、Modbusは領域・レジスター幅・符号・倍率・順序を照合。 書き込み許可時も次の生成tickで値を更新。数値の桁あふれはModbusのエラー応答を確認。
- **実行前**　公開・認証・送信先は別のプロファイルで指定し、保存後に停止・開始して適用。各条件はフォームとJSONで編集可能。

### 13-anomaly

**異常 / 突発値** · [JSONをダウンロード](13-anomaly.json)

- **想定**　設備を読み出し・購読する収集クライアントの検証。突発値を想定。
- **生成内容・条件**　更新周期1000ms、最大tick数無制限。 4設備を公開。プロファイルはdefault。OPC UAは生成項目ごとのNodeId、Modbusは0始まりのアドレスを使用。 value: holding[0] / float32 / 倍率1 / 加算0 / byte=big, word=big。 sequence_no: holding[2] / uint32 / 倍率1 / 加算0 / byte=big, word=big。 status: holding[4] / uint16 / 倍率1 / 加算0 / byte=big, word=big。 項目valueへset、値=250を生成位置20〜79で適用。異常後の型検証を迂回=False。
- **確認事項**　OPC UAは値・StatusCode・購読通知、Modbusは領域・レジスター幅・符号・倍率・順序を照合。 書き込み許可時も次の生成tickで値を更新。数値の桁あふれはModbusのエラー応答を確認。
- **実行前**　公開・認証・送信先は別のプロファイルで指定し、保存後に停止・開始して適用。各条件はフォームとJSONで編集可能。

### 14-anomaly

**異常 / ドリフト** · [JSONをダウンロード](14-anomaly.json)

- **想定**　設備を読み出し・購読する収集クライアントの検証。ドリフトを想定。
- **生成内容・条件**　更新周期1000ms、最大tick数無制限。 4設備を公開。プロファイルはdefault。OPC UAは生成項目ごとのNodeId、Modbusは0始まりのアドレスを使用。 value: holding[0] / float32 / 倍率1 / 加算0 / byte=big, word=big。 sequence_no: holding[2] / uint32 / 倍率1 / 加算0 / byte=big, word=big。 status: holding[4] / uint16 / 倍率1 / 加算0 / byte=big, word=big。 項目valueへramp、値=1を生成位置20〜79で適用。異常後の型検証を迂回=False。
- **確認事項**　OPC UAは値・StatusCode・購読通知、Modbusは領域・レジスター幅・符号・倍率・順序を照合。 書き込み許可時も次の生成tickで値を更新。数値の桁あふれはModbusのエラー応答を確認。
- **実行前**　公開・認証・送信先は別のプロファイルで指定し、保存後に停止・開始して適用。各条件はフォームとJSONで編集可能。

### 15-anomaly

**異常 / 固着** · [JSONをダウンロード](15-anomaly.json)

- **想定**　設備を読み出し・購読する収集クライアントの検証。固着を想定。
- **生成内容・条件**　更新周期1000ms、最大tick数無制限。 4設備を公開。プロファイルはdefault。OPC UAは生成項目ごとのNodeId、Modbusは0始まりのアドレスを使用。 value: holding[0] / float32 / 倍率1 / 加算0 / byte=big, word=big。 sequence_no: holding[2] / uint32 / 倍率1 / 加算0 / byte=big, word=big。 status: holding[4] / uint16 / 倍率1 / 加算0 / byte=big, word=big。 項目valueへfreeze、値=Noneを生成位置20〜79で適用。異常後の型検証を迂回=False。
- **確認事項**　OPC UAは値・StatusCode・購読通知、Modbusは領域・レジスター幅・符号・倍率・順序を照合。 書き込み許可時も次の生成tickで値を更新。数値の桁あふれはModbusのエラー応答を確認。
- **実行前**　公開・認証・送信先は別のプロファイルで指定し、保存後に停止・開始して適用。各条件はフォームとJSONで編集可能。

### 16-anomaly

**異常 / 欠測** · [JSONをダウンロード](16-anomaly.json)

- **想定**　設備を読み出し・購読する収集クライアントの検証。欠測を想定。
- **生成内容・条件**　更新周期1000ms、最大tick数無制限。 4設備を公開。プロファイルはdefault。OPC UAは生成項目ごとのNodeId、Modbusは0始まりのアドレスを使用。 value: holding[0] / float32 / 倍率1 / 加算0 / byte=big, word=big。 sequence_no: holding[2] / uint32 / 倍率1 / 加算0 / byte=big, word=big。 status: holding[4] / uint16 / 倍率1 / 加算0 / byte=big, word=big。 項目valueへnull、値=Noneを生成位置20〜79で適用。異常後の型検証を迂回=False。
- **確認事項**　OPC UAは値・StatusCode・購読通知、Modbusは領域・レジスター幅・符号・倍率・順序を照合。 書き込み許可時も次の生成tickで値を更新。数値の桁あふれはModbusのエラー応答を確認。 Modbusでは、欠測または未知の状態で変換できない番地を含む読取要求は例外4を返します。他の番地だけを対象とする要求は引き続き読み取れます。
- **実行前**　公開・認証・送信先は別のプロファイルで指定し、保存後に停止・開始して適用。各条件はフォームとJSONで編集可能。

### 17-anomaly

**異常 / 不正な型** · [JSONをダウンロード](17-anomaly.json)

- **想定**　設備を読み出し・購読する収集クライアントの検証。不正な型を想定。
- **生成内容・条件**　更新周期1000ms、最大tick数無制限。 4設備を公開。プロファイルはdefault。OPC UAは生成項目ごとのNodeId、Modbusは0始まりのアドレスを使用。 value: holding[0] / float32 / 倍率1 / 加算0 / byte=big, word=big。 sequence_no: holding[2] / uint32 / 倍率1 / 加算0 / byte=big, word=big。 status: holding[4] / uint16 / 倍率1 / 加算0 / byte=big, word=big。 項目valueへset、値='SENSOR_ERROR'を生成位置20〜79で適用。異常後の型検証を迂回=True。
- **確認事項**　OPC UAは値・StatusCode・購読通知、Modbusは領域・レジスター幅・符号・倍率・順序を照合。 書き込み許可時も次の生成tickで値を更新。数値の桁あふれはModbusのエラー応答を確認。
- **実行前**　公開・認証・送信先は別のプロファイルで指定し、保存後に停止・開始して適用。各条件はフォームとJSONで編集可能。

### 18-anomaly

**異常 / OPC Bad品質** · [JSONをダウンロード](18-anomaly.json)

- **想定**　設備を読み出し・購読する収集クライアントの検証。OPC Bad品質を想定。
- **生成内容・条件**　更新周期1000ms、最大tick数無制限。 4設備を公開。プロファイルはdefault。OPC UAは生成項目ごとのNodeId、Modbusは0始まりのアドレスを使用。 value: holding[0] / float32 / 倍率1 / 加算0 / byte=big, word=big。 sequence_no: holding[2] / uint32 / 倍率1 / 加算0 / byte=big, word=big。 status: holding[4] / uint16 / 倍率1 / 加算0 / byte=big, word=big。 tick 5〜10でOPC品質をBadSensorFailureに変更。
- **確認事項**　OPC UAは値・StatusCode・購読通知、Modbusは領域・レジスター幅・符号・倍率・順序を照合。 書き込み許可時も次の生成tickで値を更新。数値の桁あふれはModbusのエラー応答を確認。
- **実行前**　公開・認証・送信先は別のプロファイルで指定し、保存後に停止・開始して適用。各条件はフォームとJSONで編集可能。

### 19-anomaly

**異常 / OPC Uncertain品質** · [JSONをダウンロード](19-anomaly.json)

- **想定**　設備を読み出し・購読する収集クライアントの検証。OPC Uncertain品質を想定。
- **生成内容・条件**　更新周期1000ms、最大tick数無制限。 4設備を公開。プロファイルはdefault。OPC UAは生成項目ごとのNodeId、Modbusは0始まりのアドレスを使用。 value: holding[0] / float32 / 倍率1 / 加算0 / byte=big, word=big。 sequence_no: holding[2] / uint32 / 倍率1 / 加算0 / byte=big, word=big。 status: holding[4] / uint16 / 倍率1 / 加算0 / byte=big, word=big。 tick 5〜10でOPC品質をUncertainLastUsableValueに変更。
- **確認事項**　OPC UAは値・StatusCode・購読通知、Modbusは領域・レジスター幅・符号・倍率・順序を照合。 書き込み許可時も次の生成tickで値を更新。数値の桁あふれはModbusのエラー応答を確認。
- **実行前**　公開・認証・送信先は別のプロファイルで指定し、保存後に停止・開始して適用。各条件はフォームとJSONで編集可能。

### 20-anomaly

**異常 / 一時切断・復帰** · [JSONをダウンロード](20-anomaly.json)

- **想定**　設備を読み出し・購読する収集クライアントの検証。一時切断・復帰を想定。
- **生成内容・条件**　更新周期1000ms、最大tick数無制限。 4設備を公開。プロファイルはdefault。OPC UAは生成項目ごとのNodeId、Modbusは0始まりのアドレスを使用。 value: holding[0] / float32 / 倍率1 / 加算0 / byte=big, word=big。 sequence_no: holding[2] / uint32 / 倍率1 / 加算0 / byte=big, word=big。 status: holding[4] / uint16 / 倍率1 / 加算0 / byte=big, word=big。 tick 5から5tickの間、両リスナーを停止して再開。
- **確認事項**　OPC UAは値・StatusCode・購読通知、Modbusは領域・レジスター幅・符号・倍率・順序を照合。 書き込み許可時も次の生成tickで値を更新。数値の桁あふれはModbusのエラー応答を確認。
- **実行前**　公開・認証・送信先は別のプロファイルで指定し、保存後に停止・開始して適用。各条件はフォームとJSONで編集可能。

### 21-anomaly

**異常 / Modbus応答遅延** · [JSONをダウンロード](21-anomaly.json)

- **想定**　設備を読み出し・購読する収集クライアントの検証。Modbus応答遅延を想定。
- **生成内容・条件**　更新周期1000ms、最大tick数無制限。 4設備を公開。プロファイルはdefault。OPC UAは生成項目ごとのNodeId、Modbusは0始まりのアドレスを使用。 value: holding[0] / float32 / 倍率1 / 加算0 / byte=big, word=big。 sequence_no: holding[2] / uint32 / 倍率1 / 加算0 / byte=big, word=big。 status: holding[4] / uint16 / 倍率1 / 加算0 / byte=big, word=big。 Modbusアクセスへ1500msの応答遅延を追加。
- **確認事項**　OPC UAは値・StatusCode・購読通知、Modbusは領域・レジスター幅・符号・倍率・順序を照合。 書き込み許可時も次の生成tickで値を更新。数値の桁あふれはModbusのエラー応答を確認。
- **実行前**　公開・認証・送信先は別のプロファイルで指定し、保存後に停止・開始して適用。各条件はフォームとJSONで編集可能。

### 22-anomaly

**異常 / Modbus桁あふれ** · [JSONをダウンロード](22-anomaly.json)

- **想定**　設備を読み出し・購読する収集クライアントの検証。Modbus桁あふれを想定。
- **生成内容・条件**　更新周期1000ms、最大tick数無制限。 4設備を公開。プロファイルはdefault。OPC UAは生成項目ごとのNodeId、Modbusは0始まりのアドレスを使用。 value: holding[10] / int16 / 倍率10000.0 / 加算0 / byte=big, word=big。 sequence_no: holding[2] / uint32 / 倍率1 / 加算0 / byte=big, word=big。 status: holding[4] / uint16 / 倍率1 / 加算0 / byte=big, word=big。
- **確認事項**　OPC UAは値・StatusCode・購読通知、Modbusは領域・レジスター幅・符号・倍率・順序を照合。 書き込み許可時も次の生成tickで値を更新。数値の桁あふれはModbusのエラー応答を確認。
- **実行前**　公開・認証・送信先は別のプロファイルで指定し、保存後に停止・開始して適用。各条件はフォームとJSONで編集可能。

### 23-anomaly

**異常 / 未知の状態コード** · [JSONをダウンロード](23-anomaly.json)

- **想定**　設備を読み出し・購読する収集クライアントの検証。未知の状態コードを想定。
- **生成内容・条件**　更新周期1000ms、最大tick数無制限。 4設備を公開。プロファイルはdefault。OPC UAは生成項目ごとのNodeId、Modbusは0始まりのアドレスを使用。 value: holding[0] / float32 / 倍率1 / 加算0 / byte=big, word=big。 sequence_no: holding[2] / uint32 / 倍率1 / 加算0 / byte=big, word=big。 status: holding[4] / uint16 / 倍率1 / 加算0 / byte=big, word=big。 項目statusへset、値='UNKNOWN'を生成位置10〜以降で適用。異常後の型検証を迂回=False。
- **確認事項**　OPC UAは値・StatusCode・購読通知、Modbusは領域・レジスター幅・符号・倍率・順序を照合。 書き込み許可時も次の生成tickで値を更新。数値の桁あふれはModbusのエラー応答を確認。 Modbusでは、欠測または未知の状態で変換できない番地を含む読取要求は例外4を返します。他の番地だけを対象とする要求は引き続き読み取れます。
- **実行前**　公開・認証・送信先は別のプロファイルで指定し、保存後に停止・開始して適用。各条件はフォームとJSONで編集可能。

### 24-anomaly

**異常 / 更新停止に近い低速** · [JSONをダウンロード](24-anomaly.json)

- **想定**　設備を読み出し・購読する収集クライアントの検証。更新停止に近い低速を想定。
- **生成内容・条件**　更新周期60000ms、最大tick数無制限。 4設備を公開。プロファイルはdefault。OPC UAは生成項目ごとのNodeId、Modbusは0始まりのアドレスを使用。 value: holding[0] / float32 / 倍率1 / 加算0 / byte=big, word=big。 sequence_no: holding[2] / uint32 / 倍率1 / 加算0 / byte=big, word=big。 status: holding[4] / uint16 / 倍率1 / 加算0 / byte=big, word=big。
- **確認事項**　OPC UAは値・StatusCode・購読通知、Modbusは領域・レジスター幅・符号・倍率・順序を照合。 書き込み許可時も次の生成tickで値を更新。数値の桁あふれはModbusのエラー応答を確認。
- **実行前**　公開・認証・送信先は別のプロファイルで指定し、保存後に停止・開始して適用。各条件はフォームとJSONで編集可能。

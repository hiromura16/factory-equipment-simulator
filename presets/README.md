# プリセット一覧

通常12種類・異常12種類。各JSONはフォームで編集・保存できます。認証情報は含みません。

## 01-normal / 正常 / 両プロトコル / 4設備

【想定】
設備を読み出し・購読する収集クライアントの検証。両プロトコル / 4設備を想定。

【生成内容・条件】
更新周期1000ms、最大tick数無制限。
4設備を公開。プロファイルはdefault。OPC UAは生成項目ごとのNodeId、Modbusは0始まりのアドレスを使用。
value: holding[0] / float32 / 倍率1 / 加算0 / byte=big, word=big。
sequence_no: holding[2] / uint32 / 倍率1 / 加算0 / byte=big, word=big。
status: holding[4] / uint16 / 倍率1 / 加算0 / byte=big, word=big。
tick 0から5tickの間、両リスナーを停止して再開。

【確認事項】
OPC UAは値・StatusCode・購読通知、Modbusは領域・レジスター幅・符号・倍率・順序を照合。
書き込み許可時も次の生成tickで値を更新。数値の桁あふれはModbusのエラー応答を確認。

【実行前】
公開・認証・送信先は別のプロファイルで指定し、保存後に停止・開始して適用。各条件はフォームとJSONで編集可能。

## 02-normal / 正常 / OPC UAのみ

【想定】
設備を読み出し・購読する収集クライアントの検証。OPC UAのみを想定。

【生成内容・条件】
更新周期1000ms、最大tick数無制限。
4設備を公開。プロファイルはopc-only。OPC UAは生成項目ごとのNodeId、Modbusは0始まりのアドレスを使用。
value: holding[0] / float32 / 倍率1 / 加算0 / byte=big, word=big。
sequence_no: holding[2] / uint32 / 倍率1 / 加算0 / byte=big, word=big。
status: holding[4] / uint16 / 倍率1 / 加算0 / byte=big, word=big。
tick 0から5tickの間、両リスナーを停止して再開。

【確認事項】
OPC UAは値・StatusCode・購読通知、Modbusは領域・レジスター幅・符号・倍率・順序を照合。
書き込み許可時も次の生成tickで値を更新。数値の桁あふれはModbusのエラー応答を確認。

【実行前】
公開・認証・送信先は別のプロファイルで指定し、保存後に停止・開始して適用。各条件はフォームとJSONで編集可能。

## 03-normal / 正常 / Modbusのみ

【想定】
設備を読み出し・購読する収集クライアントの検証。Modbusのみを想定。

【生成内容・条件】
更新周期1000ms、最大tick数無制限。
4設備を公開。プロファイルはmodbus-only。OPC UAは生成項目ごとのNodeId、Modbusは0始まりのアドレスを使用。
value: holding[0] / float32 / 倍率1 / 加算0 / byte=big, word=big。
sequence_no: holding[2] / uint32 / 倍率1 / 加算0 / byte=big, word=big。
status: holding[4] / uint16 / 倍率1 / 加算0 / byte=big, word=big。
tick 0から5tickの間、両リスナーを停止して再開。

【確認事項】
OPC UAは値・StatusCode・購読通知、Modbusは領域・レジスター幅・符号・倍率・順序を照合。
書き込み許可時も次の生成tickで値を更新。数値の桁あふれはModbusのエラー応答を確認。

【実行前】
公開・認証・送信先は別のプロファイルで指定し、保存後に停止・開始して適用。各条件はフォームとJSONで編集可能。

## 04-normal / 正常 / 16設備 / 100ms更新

【想定】
設備を読み出し・購読する収集クライアントの検証。16設備 / 100ms更新を想定。

【生成内容・条件】
更新周期100ms、最大tick数無制限。
16設備を公開。プロファイルはdefault。OPC UAは生成項目ごとのNodeId、Modbusは0始まりのアドレスを使用。
value: holding[0] / float32 / 倍率1 / 加算0 / byte=big, word=big。
sequence_no: holding[2] / uint32 / 倍率1 / 加算0 / byte=big, word=big。
status: holding[4] / uint16 / 倍率1 / 加算0 / byte=big, word=big。
tick 0から5tickの間、両リスナーを停止して再開。

【確認事項】
OPC UAは値・StatusCode・購読通知、Modbusは領域・レジスター幅・符号・倍率・順序を照合。
書き込み許可時も次の生成tickで値を更新。数値の桁あふれはModbusのエラー応答を確認。

【実行前】
公開・認証・送信先は別のプロファイルで指定し、保存後に停止・開始して適用。各条件はフォームとJSONで編集可能。

## 05-normal / 正常 / 32bit整数のレジスター

【想定】
設備を読み出し・購読する収集クライアントの検証。32bit整数のレジスターを想定。

【生成内容・条件】
更新周期1000ms、最大tick数無制限。
4設備を公開。プロファイルはdefault。OPC UAは生成項目ごとのNodeId、Modbusは0始まりのアドレスを使用。
sequence_no: holding[10] / uint32 / 倍率1 / 加算0 / byte=big, word=big。
sequence_no: holding[2] / uint32 / 倍率1 / 加算0 / byte=big, word=big。
status: holding[4] / uint16 / 倍率1 / 加算0 / byte=big, word=big。
tick 0から5tickの間、両リスナーを停止して再開。

【確認事項】
OPC UAは値・StatusCode・購読通知、Modbusは領域・レジスター幅・符号・倍率・順序を照合。
書き込み許可時も次の生成tickで値を更新。数値の桁あふれはModbusのエラー応答を確認。

【実行前】
公開・認証・送信先は別のプロファイルで指定し、保存後に停止・開始して適用。各条件はフォームとJSONで編集可能。

## 06-normal / 正常 / ワード順を反転

【想定】
設備を読み出し・購読する収集クライアントの検証。ワード順を反転を想定。

【生成内容・条件】
更新周期1000ms、最大tick数無制限。
4設備を公開。プロファイルはdefault。OPC UAは生成項目ごとのNodeId、Modbusは0始まりのアドレスを使用。
value: holding[0] / float32 / 倍率1 / 加算0 / byte=big, word=little。
sequence_no: holding[2] / uint32 / 倍率1 / 加算0 / byte=big, word=big。
status: holding[4] / uint16 / 倍率1 / 加算0 / byte=big, word=big。
tick 0から5tickの間、両リスナーを停止して再開。

【確認事項】
OPC UAは値・StatusCode・購読通知、Modbusは領域・レジスター幅・符号・倍率・順序を照合。
書き込み許可時も次の生成tickで値を更新。数値の桁あふれはModbusのエラー応答を確認。

【実行前】
公開・認証・送信先は別のプロファイルで指定し、保存後に停止・開始して適用。各条件はフォームとJSONで編集可能。

## 07-normal / 正常 / バイト順を反転

【想定】
設備を読み出し・購読する収集クライアントの検証。バイト順を反転を想定。

【生成内容・条件】
更新周期1000ms、最大tick数無制限。
4設備を公開。プロファイルはdefault。OPC UAは生成項目ごとのNodeId、Modbusは0始まりのアドレスを使用。
value: holding[0] / float32 / 倍率1 / 加算0 / byte=little, word=big。
sequence_no: holding[2] / uint32 / 倍率1 / 加算0 / byte=big, word=big。
status: holding[4] / uint16 / 倍率1 / 加算0 / byte=big, word=big。
tick 0から5tickの間、両リスナーを停止して再開。

【確認事項】
OPC UAは値・StatusCode・購読通知、Modbusは領域・レジスター幅・符号・倍率・順序を照合。
書き込み許可時も次の生成tickで値を更新。数値の桁あふれはModbusのエラー応答を確認。

【実行前】
公開・認証・送信先は別のプロファイルで指定し、保存後に停止・開始して適用。各条件はフォームとJSONで編集可能。

## 08-normal / 正常 / コイル / 真偽値

【想定】
設備を読み出し・購読する収集クライアントの検証。コイル / 真偽値を想定。

【生成内容・条件】
更新周期1000ms、最大tick数無制限。
4設備を公開。プロファイルはdefault。OPC UAは生成項目ごとのNodeId、Modbusは0始まりのアドレスを使用。
value: holding[0] / float32 / 倍率1 / 加算0 / byte=big, word=big。
sequence_no: holding[2] / uint32 / 倍率1 / 加算0 / byte=big, word=big。
status: holding[4] / uint16 / 倍率1 / 加算0 / byte=big, word=big。
active: coil[0] / bool / 倍率1 / 加算0 / byte=big, word=big。
tick 0から5tickの間、両リスナーを停止して再開。

【確認事項】
OPC UAは値・StatusCode・購読通知、Modbusは領域・レジスター幅・符号・倍率・順序を照合。
書き込み許可時も次の生成tickで値を更新。数値の桁あふれはModbusのエラー応答を確認。

【実行前】
公開・認証・送信先は別のプロファイルで指定し、保存後に停止・開始して適用。各条件はフォームとJSONで編集可能。

## 09-normal / 正常 / 入力レジスター

【想定】
設備を読み出し・購読する収集クライアントの検証。入力レジスターを想定。

【生成内容・条件】
更新周期1000ms、最大tick数無制限。
4設備を公開。プロファイルはdefault。OPC UAは生成項目ごとのNodeId、Modbusは0始まりのアドレスを使用。
value: input[0] / float32 / 倍率1 / 加算0 / byte=big, word=big。
sequence_no: holding[2] / uint32 / 倍率1 / 加算0 / byte=big, word=big。
status: holding[4] / uint16 / 倍率1 / 加算0 / byte=big, word=big。
tick 0から5tickの間、両リスナーを停止して再開。

【確認事項】
OPC UAは値・StatusCode・購読通知、Modbusは領域・レジスター幅・符号・倍率・順序を照合。
書き込み許可時も次の生成tickで値を更新。数値の桁あふれはModbusのエラー応答を確認。

【実行前】
公開・認証・送信先は別のプロファイルで指定し、保存後に停止・開始して適用。各条件はフォームとJSONで編集可能。

## 10-normal / 正常 / クライアント書き込み

【想定】
設備を読み出し・購読する収集クライアントの検証。クライアント書き込みを想定。

【生成内容・条件】
更新周期1000ms、最大tick数無制限。
4設備を公開。プロファイルはdefault。OPC UAは生成項目ごとのNodeId、Modbusは0始まりのアドレスを使用。
value: holding[0] / float32 / 倍率1 / 加算0 / byte=big, word=big。
sequence_no: holding[2] / uint32 / 倍率1 / 加算0 / byte=big, word=big。
status: holding[4] / uint16 / 倍率1 / 加算0 / byte=big, word=big。
tick 0から5tickの間、両リスナーを停止して再開。

【確認事項】
OPC UAは値・StatusCode・購読通知、Modbusは領域・レジスター幅・符号・倍率・順序を照合。
書き込み許可時も次の生成tickで値を更新。数値の桁あふれはModbusのエラー応答を確認。

【実行前】
公開・認証・送信先は別のプロファイルで指定し、保存後に停止・開始して適用。各条件はフォームとJSONで編集可能。

## 11-normal / 正常 / 低速 / 5秒周期

【想定】
設備を読み出し・購読する収集クライアントの検証。低速 / 5秒周期を想定。

【生成内容・条件】
更新周期5000ms、最大tick数無制限。
4設備を公開。プロファイルはdefault。OPC UAは生成項目ごとのNodeId、Modbusは0始まりのアドレスを使用。
value: holding[0] / float32 / 倍率1 / 加算0 / byte=big, word=big。
sequence_no: holding[2] / uint32 / 倍率1 / 加算0 / byte=big, word=big。
status: holding[4] / uint16 / 倍率1 / 加算0 / byte=big, word=big。
tick 0から5tickの間、両リスナーを停止して再開。

【確認事項】
OPC UAは値・StatusCode・購読通知、Modbusは領域・レジスター幅・符号・倍率・順序を照合。
書き込み許可時も次の生成tickで値を更新。数値の桁あふれはModbusのエラー応答を確認。

【実行前】
公開・認証・送信先は別のプロファイルで指定し、保存後に停止・開始して適用。各条件はフォームとJSONで編集可能。

## 12-normal / 正常 / 独自のデータ項目

【想定】
設備を読み出し・購読する収集クライアントの検証。独自のデータ項目を想定。

【生成内容・条件】
更新周期1000ms、最大tick数無制限。
4設備を公開。プロファイルはdefault。OPC UAは生成項目ごとのNodeId、Modbusは0始まりのアドレスを使用。
temperature: holding[0] / float32 / 倍率1 / 加算0 / byte=big, word=big。
sequence_no: holding[2] / uint32 / 倍率1 / 加算0 / byte=big, word=big。
status: holding[4] / uint16 / 倍率1 / 加算0 / byte=big, word=big。
tick 0から5tickの間、両リスナーを停止して再開。

【確認事項】
OPC UAは値・StatusCode・購読通知、Modbusは領域・レジスター幅・符号・倍率・順序を照合。
書き込み許可時も次の生成tickで値を更新。数値の桁あふれはModbusのエラー応答を確認。

【実行前】
公開・認証・送信先は別のプロファイルで指定し、保存後に停止・開始して適用。各条件はフォームとJSONで編集可能。

## 13-anomaly / 異常 / 突発値

【想定】
設備を読み出し・購読する収集クライアントの検証。突発値を想定。

【生成内容・条件】
更新周期1000ms、最大tick数無制限。
4設備を公開。プロファイルはdefault。OPC UAは生成項目ごとのNodeId、Modbusは0始まりのアドレスを使用。
value: holding[0] / float32 / 倍率1 / 加算0 / byte=big, word=big。
sequence_no: holding[2] / uint32 / 倍率1 / 加算0 / byte=big, word=big。
status: holding[4] / uint16 / 倍率1 / 加算0 / byte=big, word=big。
tick 0から5tickの間、両リスナーを停止して再開。
項目valueへset、値=250を生成位置20〜79で適用。異常後の型検証を迂回=False。

【確認事項】
OPC UAは値・StatusCode・購読通知、Modbusは領域・レジスター幅・符号・倍率・順序を照合。
書き込み許可時も次の生成tickで値を更新。数値の桁あふれはModbusのエラー応答を確認。

【実行前】
公開・認証・送信先は別のプロファイルで指定し、保存後に停止・開始して適用。各条件はフォームとJSONで編集可能。

## 14-anomaly / 異常 / ドリフト

【想定】
設備を読み出し・購読する収集クライアントの検証。ドリフトを想定。

【生成内容・条件】
更新周期1000ms、最大tick数無制限。
4設備を公開。プロファイルはdefault。OPC UAは生成項目ごとのNodeId、Modbusは0始まりのアドレスを使用。
value: holding[0] / float32 / 倍率1 / 加算0 / byte=big, word=big。
sequence_no: holding[2] / uint32 / 倍率1 / 加算0 / byte=big, word=big。
status: holding[4] / uint16 / 倍率1 / 加算0 / byte=big, word=big。
tick 0から5tickの間、両リスナーを停止して再開。
項目valueへramp、値=1を生成位置20〜79で適用。異常後の型検証を迂回=False。

【確認事項】
OPC UAは値・StatusCode・購読通知、Modbusは領域・レジスター幅・符号・倍率・順序を照合。
書き込み許可時も次の生成tickで値を更新。数値の桁あふれはModbusのエラー応答を確認。

【実行前】
公開・認証・送信先は別のプロファイルで指定し、保存後に停止・開始して適用。各条件はフォームとJSONで編集可能。

## 15-anomaly / 異常 / 固着

【想定】
設備を読み出し・購読する収集クライアントの検証。固着を想定。

【生成内容・条件】
更新周期1000ms、最大tick数無制限。
4設備を公開。プロファイルはdefault。OPC UAは生成項目ごとのNodeId、Modbusは0始まりのアドレスを使用。
value: holding[0] / float32 / 倍率1 / 加算0 / byte=big, word=big。
sequence_no: holding[2] / uint32 / 倍率1 / 加算0 / byte=big, word=big。
status: holding[4] / uint16 / 倍率1 / 加算0 / byte=big, word=big。
tick 0から5tickの間、両リスナーを停止して再開。
項目valueへfreeze、値=Noneを生成位置20〜79で適用。異常後の型検証を迂回=False。

【確認事項】
OPC UAは値・StatusCode・購読通知、Modbusは領域・レジスター幅・符号・倍率・順序を照合。
書き込み許可時も次の生成tickで値を更新。数値の桁あふれはModbusのエラー応答を確認。

【実行前】
公開・認証・送信先は別のプロファイルで指定し、保存後に停止・開始して適用。各条件はフォームとJSONで編集可能。

## 16-anomaly / 異常 / 欠測

【想定】
設備を読み出し・購読する収集クライアントの検証。欠測を想定。

【生成内容・条件】
更新周期1000ms、最大tick数無制限。
4設備を公開。プロファイルはdefault。OPC UAは生成項目ごとのNodeId、Modbusは0始まりのアドレスを使用。
value: holding[0] / float32 / 倍率1 / 加算0 / byte=big, word=big。
sequence_no: holding[2] / uint32 / 倍率1 / 加算0 / byte=big, word=big。
status: holding[4] / uint16 / 倍率1 / 加算0 / byte=big, word=big。
tick 0から5tickの間、両リスナーを停止して再開。
項目valueへnull、値=Noneを生成位置20〜79で適用。異常後の型検証を迂回=False。

【確認事項】
OPC UAは値・StatusCode・購読通知、Modbusは領域・レジスター幅・符号・倍率・順序を照合。
書き込み許可時も次の生成tickで値を更新。数値の桁あふれはModbusのエラー応答を確認。

【実行前】
公開・認証・送信先は別のプロファイルで指定し、保存後に停止・開始して適用。各条件はフォームとJSONで編集可能。

## 17-anomaly / 異常 / 不正な型

【想定】
設備を読み出し・購読する収集クライアントの検証。不正な型を想定。

【生成内容・条件】
更新周期1000ms、最大tick数無制限。
4設備を公開。プロファイルはdefault。OPC UAは生成項目ごとのNodeId、Modbusは0始まりのアドレスを使用。
value: holding[0] / float32 / 倍率1 / 加算0 / byte=big, word=big。
sequence_no: holding[2] / uint32 / 倍率1 / 加算0 / byte=big, word=big。
status: holding[4] / uint16 / 倍率1 / 加算0 / byte=big, word=big。
tick 0から5tickの間、両リスナーを停止して再開。
項目valueへset、値='SENSOR_ERROR'を生成位置20〜79で適用。異常後の型検証を迂回=True。

【確認事項】
OPC UAは値・StatusCode・購読通知、Modbusは領域・レジスター幅・符号・倍率・順序を照合。
書き込み許可時も次の生成tickで値を更新。数値の桁あふれはModbusのエラー応答を確認。

【実行前】
公開・認証・送信先は別のプロファイルで指定し、保存後に停止・開始して適用。各条件はフォームとJSONで編集可能。

## 18-anomaly / 異常 / OPC Bad品質

【想定】
設備を読み出し・購読する収集クライアントの検証。OPC Bad品質を想定。

【生成内容・条件】
更新周期1000ms、最大tick数無制限。
4設備を公開。プロファイルはdefault。OPC UAは生成項目ごとのNodeId、Modbusは0始まりのアドレスを使用。
value: holding[0] / float32 / 倍率1 / 加算0 / byte=big, word=big。
sequence_no: holding[2] / uint32 / 倍率1 / 加算0 / byte=big, word=big。
status: holding[4] / uint16 / 倍率1 / 加算0 / byte=big, word=big。
tick 5〜10でOPC品質をBadSensorFailureに変更。
tick 0から5tickの間、両リスナーを停止して再開。

【確認事項】
OPC UAは値・StatusCode・購読通知、Modbusは領域・レジスター幅・符号・倍率・順序を照合。
書き込み許可時も次の生成tickで値を更新。数値の桁あふれはModbusのエラー応答を確認。

【実行前】
公開・認証・送信先は別のプロファイルで指定し、保存後に停止・開始して適用。各条件はフォームとJSONで編集可能。

## 19-anomaly / 異常 / OPC Uncertain品質

【想定】
設備を読み出し・購読する収集クライアントの検証。OPC Uncertain品質を想定。

【生成内容・条件】
更新周期1000ms、最大tick数無制限。
4設備を公開。プロファイルはdefault。OPC UAは生成項目ごとのNodeId、Modbusは0始まりのアドレスを使用。
value: holding[0] / float32 / 倍率1 / 加算0 / byte=big, word=big。
sequence_no: holding[2] / uint32 / 倍率1 / 加算0 / byte=big, word=big。
status: holding[4] / uint16 / 倍率1 / 加算0 / byte=big, word=big。
tick 5〜10でOPC品質をUncertainLastUsableValueに変更。
tick 0から5tickの間、両リスナーを停止して再開。

【確認事項】
OPC UAは値・StatusCode・購読通知、Modbusは領域・レジスター幅・符号・倍率・順序を照合。
書き込み許可時も次の生成tickで値を更新。数値の桁あふれはModbusのエラー応答を確認。

【実行前】
公開・認証・送信先は別のプロファイルで指定し、保存後に停止・開始して適用。各条件はフォームとJSONで編集可能。

## 20-anomaly / 異常 / 一時切断・復帰

【想定】
設備を読み出し・購読する収集クライアントの検証。一時切断・復帰を想定。

【生成内容・条件】
更新周期1000ms、最大tick数無制限。
4設備を公開。プロファイルはdefault。OPC UAは生成項目ごとのNodeId、Modbusは0始まりのアドレスを使用。
value: holding[0] / float32 / 倍率1 / 加算0 / byte=big, word=big。
sequence_no: holding[2] / uint32 / 倍率1 / 加算0 / byte=big, word=big。
status: holding[4] / uint16 / 倍率1 / 加算0 / byte=big, word=big。
tick 5から5tickの間、両リスナーを停止して再開。

【確認事項】
OPC UAは値・StatusCode・購読通知、Modbusは領域・レジスター幅・符号・倍率・順序を照合。
書き込み許可時も次の生成tickで値を更新。数値の桁あふれはModbusのエラー応答を確認。

【実行前】
公開・認証・送信先は別のプロファイルで指定し、保存後に停止・開始して適用。各条件はフォームとJSONで編集可能。

## 21-anomaly / 異常 / Modbus応答遅延

【想定】
設備を読み出し・購読する収集クライアントの検証。Modbus応答遅延を想定。

【生成内容・条件】
更新周期1000ms、最大tick数無制限。
4設備を公開。プロファイルはdefault。OPC UAは生成項目ごとのNodeId、Modbusは0始まりのアドレスを使用。
value: holding[0] / float32 / 倍率1 / 加算0 / byte=big, word=big。
sequence_no: holding[2] / uint32 / 倍率1 / 加算0 / byte=big, word=big。
status: holding[4] / uint16 / 倍率1 / 加算0 / byte=big, word=big。
tick 0から5tickの間、両リスナーを停止して再開。
Modbusアクセスへ1500msの応答遅延を追加。

【確認事項】
OPC UAは値・StatusCode・購読通知、Modbusは領域・レジスター幅・符号・倍率・順序を照合。
書き込み許可時も次の生成tickで値を更新。数値の桁あふれはModbusのエラー応答を確認。

【実行前】
公開・認証・送信先は別のプロファイルで指定し、保存後に停止・開始して適用。各条件はフォームとJSONで編集可能。

## 22-anomaly / 異常 / Modbus桁あふれ

【想定】
設備を読み出し・購読する収集クライアントの検証。Modbus桁あふれを想定。

【生成内容・条件】
更新周期1000ms、最大tick数無制限。
4設備を公開。プロファイルはdefault。OPC UAは生成項目ごとのNodeId、Modbusは0始まりのアドレスを使用。
value: holding[10] / int16 / 倍率10000.0 / 加算0 / byte=big, word=big。
sequence_no: holding[2] / uint32 / 倍率1 / 加算0 / byte=big, word=big。
status: holding[4] / uint16 / 倍率1 / 加算0 / byte=big, word=big。
tick 0から5tickの間、両リスナーを停止して再開。

【確認事項】
OPC UAは値・StatusCode・購読通知、Modbusは領域・レジスター幅・符号・倍率・順序を照合。
書き込み許可時も次の生成tickで値を更新。数値の桁あふれはModbusのエラー応答を確認。

【実行前】
公開・認証・送信先は別のプロファイルで指定し、保存後に停止・開始して適用。各条件はフォームとJSONで編集可能。

## 23-anomaly / 異常 / 未知の状態コード

【想定】
設備を読み出し・購読する収集クライアントの検証。未知の状態コードを想定。

【生成内容・条件】
更新周期1000ms、最大tick数無制限。
4設備を公開。プロファイルはdefault。OPC UAは生成項目ごとのNodeId、Modbusは0始まりのアドレスを使用。
value: holding[0] / float32 / 倍率1 / 加算0 / byte=big, word=big。
sequence_no: holding[2] / uint32 / 倍率1 / 加算0 / byte=big, word=big。
status: holding[4] / uint16 / 倍率1 / 加算0 / byte=big, word=big。
tick 0から5tickの間、両リスナーを停止して再開。
項目statusへset、値='UNKNOWN'を生成位置10〜以降で適用。異常後の型検証を迂回=False。

【確認事項】
OPC UAは値・StatusCode・購読通知、Modbusは領域・レジスター幅・符号・倍率・順序を照合。
書き込み許可時も次の生成tickで値を更新。数値の桁あふれはModbusのエラー応答を確認。

【実行前】
公開・認証・送信先は別のプロファイルで指定し、保存後に停止・開始して適用。各条件はフォームとJSONで編集可能。

## 24-anomaly / 異常 / 更新停止に近い低速

【想定】
設備を読み出し・購読する収集クライアントの検証。更新停止に近い低速を想定。

【生成内容・条件】
更新周期60000ms、最大tick数無制限。
4設備を公開。プロファイルはdefault。OPC UAは生成項目ごとのNodeId、Modbusは0始まりのアドレスを使用。
value: holding[0] / float32 / 倍率1 / 加算0 / byte=big, word=big。
sequence_no: holding[2] / uint32 / 倍率1 / 加算0 / byte=big, word=big。
status: holding[4] / uint16 / 倍率1 / 加算0 / byte=big, word=big。
tick 0から5tickの間、両リスナーを停止して再開。

【確認事項】
OPC UAは値・StatusCode・購読通知、Modbusは領域・レジスター幅・符号・倍率・順序を照合。
書き込み許可時も次の生成tickで値を更新。数値の桁あふれはModbusのエラー応答を確認。

【実行前】
公開・認証・送信先は別のプロファイルで指定し、保存後に停止・開始して適用。各条件はフォームとJSONで編集可能。

(() => {
  "use strict";

  const widths = { uint32: 2, int32: 2, float32: 2, float64: 4 };
  const registerWidth = (encoding) => Object.hasOwn(widths, encoding) ? widths[encoding] : 1;
  const numericTypes = new Set(["integer", "number", "decimal"]);
  const areas = [
    { value: "holding", label: "保持レジスター (holding)" },
    { value: "input", label: "入力レジスター (input)" },
    { value: "coil", label: "コイル (coil)" },
    { value: "discrete", label: "ディスクリート入力 (discrete)" },
  ];
  const orders = [
    { value: "big", label: "上位から (big)" },
    { value: "little", label: "下位から (little)" },
  ];

  function generatorFields(spec) {
    return Array.isArray(spec?.generator?.fields) ? spec.generator.fields : [];
  }

  function newRegister(rows, spec) {
    const fields = generatorFields(spec).filter((field) => numericTypes.has(field?.data_type));
    const field = fields.find((entry) => entry.name === "value") || fields[0];
    const encoding = field?.data_type === "integer" ? "int32" : "float32";
    const width = registerWidth(encoding);
    const reserved = new Set();
    for (const row of rows) {
      if (row?.area !== "holding" || !Number.isInteger(row.address)) continue;
      for (let offset = 0; offset < registerWidth(row.encoding); offset += 1) {
        reserved.add(row.address + offset);
      }
    }

    let address = 0;
    while (address + width <= 65536) {
      if (Array.from({ length: width }, (_, offset) => address + offset).every((slot) => !reserved.has(slot))) break;
      address += 1;
    }

    return {
      field: field?.name || "value",
      area: "holding",
      address: address + width <= 65536 ? address : 0,
      encoding,
      byte_order: "big",
      word_order: "big",
      scale: 1,
      offset: 0,
      enum_values: {},
    };
  }

  function summarize(spec, preview) {
    const equipment = spec?.equipment;
    if (!equipment) return [];
    const summary = [];
    const fields = generatorFields(spec);
    if (Number.isInteger(equipment.devices)) {
      summary.push({ label: "模擬設備", value: String(equipment.devices) + " 台" });
      if (fields.length) {
        const total = equipment.devices * fields.length;
        summary.push({
          label: "OPC UA 生成ノード数の目安",
          value: total.toLocaleString("ja-JP") + " 項目" + (total > 5000 ? "（5,000項目の上限超過）" : ""),
        });
      }
    }

    const rows = Array.isArray(equipment.registers) ? equipment.registers : [];
    const used = new Set();
    const ranges = [];
    let overlaps = 0;
    let invalid = 0;
    let wrongBitType = 0;
    let unknownFields = 0;
    const fieldNames = new Set(fields.map((f) => f?.name));
    for (const row of rows) {
      if (!row || !Number.isInteger(row.address)) continue;
      if (["coil", "discrete"].includes(row.area) && row.encoding !== "bool") wrongBitType += 1;
      const width = registerWidth(row.encoding);
      const end = row.address + width - 1;
      if (row.address < 0 || end > 65535) invalid += 1;
      if (fields.length && !fieldNames.has(row.field)) unknownFields += 1;
      let overlap = false;
      for (let offset = 0; offset < width; offset += 1) {
        const slot = row.area + ":" + (row.address + offset);
        if (used.has(slot)) overlap = true;
        used.add(slot);
      }
      if (overlap) overlaps += 1;
      if (ranges.length < 6) {
        ranges.push(row.area + "[" + row.address + (width > 1 ? "〜" + end : "") + "]");
      }
    }
    if (ranges.length) {
      const rest = rows.length - ranges.length;
      summary.push({ label: "Modbus 配置", value: ranges.join(" · ") + (rest > 0 ? " · ほか " + rest + " 件" : "") });
    }
    if (overlaps || invalid || unknownFields || wrongBitType) {
      summary.push({
        label: "レジスター要確認",
        value: [
          overlaps && "アドレス重複 " + overlaps + " 行",
          invalid && "範囲外 " + invalid + " 行",
          wrongBitType && "bit領域の型不一致 " + wrongBitType + " 行",
          unknownFields && "参照項目なし " + unknownFields + " 行",
        ].filter(Boolean).join(" / "),
      });
    }

    const mapping = preview?.protocol_mapping;
    if (mapping?.modbus_registers?.length) {
      const total = mapping.modbus_registers.length;
      const converted = mapping.modbus_registers.filter((row) => row.status === "変換成功").length;
      const first = mapping.modbus_registers.find((row) => Array.isArray(row.values));
      const example = first ? " · " + first.field + " = " + first.values.join(", ") : "";
      summary.push({ label: "設備1の Modbus 見本", value: converted + "/" + total + " 件変換成功" + example });
    }
    if (mapping?.opc_ua_identifiers?.length) {
      summary.push({ label: "設備1の OPC UA ノード例", value: mapping.opc_ua_identifiers.slice(0, 3).join(" / ") });
    }
    return summary;
  }


  const types = [
    { value: "string", label: "文字列" },
    { value: "integer", label: "整数" },
    { value: "number", label: "実数" },
    { value: "decimal", label: "固定小数点" },
    { value: "boolean", label: "真偽値" },
    { value: "datetime", label: "日時" },
    { value: "json", label: "JSON" },
  ];
  const generators = [
    { value: "record_id", label: "決定的なレコードID" },
    { value: "uuid", label: "UUID" },
    { value: "sequence", label: "連番" },
    { value: "integer", label: "ランダム整数" },
    { value: "uniform", label: "一様分布" },
    { value: "normal", label: "正規分布" },
    { value: "choice", label: "候補から選択" },
    { value: "boolean", label: "確率で真偽値" },
    { value: "constant", label: "固定値" },
    { value: "template", label: "文字列ひな型" },
    { value: "timestamp", label: "時刻の連番" },
    { value: "reference", label: "前の項目を参照" },
    { value: "sum", label: "参照値の和" },
    { value: "difference", label: "参照値の差" },
    { value: "product", label: "参照値の積" },
    { value: "ratio", label: "参照値の比" },
  ];
  const anomalyOperations = [
    { value: "set", label: "値を置き換え" },
    { value: "add", label: "加算" },
    { value: "multiply", label: "倍率" },
    { value: "ramp", label: "連続的に増減" },
    { value: "freeze", label: "開始位置の値に固定" },
    { value: "null", label: "NULLを設定" },
    { value: "copy_from", label: "別位置からコピー" },
    { value: "timestamp_shift", label: "時刻をずらす" },
    { value: "omit", label: "項目を省略" },
  ];
  const generatorIs = (...equals) => ({ path: "generator", equals });
  const generatedFields = (spec) => Array.isArray(spec?.generator?.fields) ? spec.generator.fields : [];
  const fieldNames = (spec) => generatedFields(spec).flatMap((field) => typeof field?.name === "string" ? [field.name] : []);

  function newField(rows) {
    const names = new Set(rows.flatMap((row) => typeof row?.name === "string" ? [row.name.toLowerCase()] : []));
    let name = "measurement";
    let suffix = 2;
    while (names.has(name)) {
      name = "measurement_" + suffix;
      suffix += 1;
    }
    return { name, data_type: "number", generator: "constant", value: 0 };
  }

  function newAnomaly(_rows, spec) {
    const fields = generatedFields(spec);
    const numeric = fields.find((field) => !field?.primary_key && ["integer", "number", "decimal"].includes(field?.data_type));
    const first = numeric || fields.find((field) => field?.name && !field.primary_key) || fields.find((field) => field?.name);
    return {
      name: "異常注入",
      enabled: false,
      field: first?.name || "value",
      operation: numeric ? "add" : "null",
      value: numeric ? 1 : null,
      from_row: 0,
      every: 1,
      probability: 1,
    };
  }

  const generationSection = {
    title: "設備が公開する生成項目",
    description: "ここで定義した項目は OPC UA のノードになり、Modbus レジスターの参照候補にもなります。",
    fields: [
      { path: "generator.seed", label: "乱数シード", type: "integer", min: 0, max: 2147483647, default: 42, help: "同じ条件とシードで同じ値を再現できます。" },
      { path: "generator.start_sequence", label: "生成順の開始値", type: "integer", min: 0, max: 1000000000, default: 0 },
      { path: "generator.parameters", label: "共通パラメーター", type: "json", default: {}, help: "JSONのオブジェクト。項目設定から文字列の $キー を使って値を参照できます。" },
      {
        path: "generator.fields",
        label: "生成項目",
        type: "table",
        min: 1,
        max: 100,
        default: newField,
        columns: [
          { path: "name", label: "項目名", type: "text", help: "半角英数字と _ を使います。先頭は英字か _ です。", placeholder: "measurement" },
          { path: "data_type", label: "型", type: "select", options: types, default: "string" },
          { path: "generator", label: "生成方法", type: "select", options: generators, default: "constant" },
          { path: "value", label: "固定値", type: "json", default: null, when: generatorIs("constant"), help: "文字列はダブルクォートで囲み、数値や true / false はそのまま入力します。" },
          { path: "minimum", label: "下限値", type: "json", default: 0, when: generatorIs("integer", "uniform"), help: "数値、または \"$パラメーター名\"。" },
          { path: "maximum", label: "上限値", type: "json", default: 100, when: generatorIs("integer", "uniform") },
          { path: "mean", label: "平均値", type: "json", default: 50, when: generatorIs("normal"), help: "数値、または \"$パラメーター名\"。" },
          { path: "stddev", label: "標準偏差", type: "json", default: 5, when: generatorIs("normal"), help: "0以上。大きいほどばらつきが広がります。" },
          { path: "start", label: "開始値・開始日時", type: "json", default: 0, when: generatorIs("sequence", "timestamp"), help: "日時にはタイムゾーン付き文字列か、その値を持つ \"$パラメーター名\" を指定します。" },
          { path: "step", label: "増分（日時は秒）", type: "json", default: 1, when: generatorIs("sequence", "timestamp") },
          { path: "group_size", label: "同じ値を続ける件数", type: "json", default: 1, when: generatorIs("sequence", "timestamp") },
          { path: "modulo", label: "繰り返すまでの段階数", type: "json", default: 0, when: generatorIs("sequence", "timestamp"), help: "0を指定すると繰り返しません。" },
          { path: "choices", label: "候補リスト", type: "json", default: [], when: generatorIs("choice"), placeholder: '["ok", "warning"]', help: "JSON配列、または配列を持つ \"$パラメーター名\"。" },
          { path: "weights", label: "候補ごとの重み", type: "json", default: [], when: generatorIs("choice"), placeholder: "[9, 1]", help: "空の配列なら同じ確率です。指定する場合は候補と同じ件数にします。" },
          { path: "probability", label: "true となる確率", type: "json", default: 0.5, when: generatorIs("boolean"), help: "0〜1、または \"$パラメーター名\"。" },
          { path: "template", label: "文字列ひな型", type: "text", default: "{sequence}", when: generatorIs("template"), help: "{項目名}、{sequence}、{record_id} などを展開します。" },
          { path: "sources", label: "参照項目（1行1項目）", type: "string-list", default: [], when: generatorIs("reference", "sum", "difference", "product", "ratio"), help: "表で先に定義した項目を指定します。比率は分子、分母の順です。" },
          { path: "length", label: "文字列の最大長", type: "integer", min: 1, max: 4000, default: 255, when: { path: "data_type", equals: "string" } },
          { path: "precision", label: "全体の精度（桁）", type: "integer", min: 1, max: 38, default: 18, when: { path: "data_type", equals: "decimal" } },
          { path: "scale", label: "小数部の桁数", type: "integer", min: 0, max: 18, default: 3, when: { path: "data_type", equals: "decimal" } },
          { path: "primary_key", label: "一意キー", type: "boolean", default: false, help: "一意キーにNULL率は指定できません。" },
          { path: "null_probability", label: "NULL率 (0〜1)", type: "number", min: 0, max: 1, step: "any", default: 0 },
          { path: "condition", label: "条件分岐（JSON）", type: "json", default: null, help: "他の項目の値に応じて生成値を差し替える詳細条件です。通常は null のままにします。" },
        ],
      },
    ],
  };

  const anomalySection = {
    title: "生成項目の異常シナリオ",
    description: "センサー値のずれ・固定・欠測を合成値に適用します。通信断や品質コードは設備専用のセクションから設定します。",
    fields: [
      {
        path: "generator.anomalies",
        label: "値の異常ルール",
        type: "table",
        max: 64,
        default: newAnomaly,
        columns: [
          { path: "name", label: "異常名", type: "text", default: "異常注入" },
          { path: "enabled", label: "適用する", type: "boolean", default: true },
          { path: "field", label: "対象項目", type: "text", suggestions: fieldNames },
          { path: "operation", label: "変更方法", type: "select", options: anomalyOperations, default: "set" },
          { path: "value", label: "置換値・変化量・コピー元", type: "json", default: null, when: { path: "operation", equals: ["set", "add", "multiply", "ramp", "copy_from", "timestamp_shift"] }, help: "加算・倍率は数値、コピー元は0から始まる行位置、時刻のずれは秒で指定します。" },
          { path: "from_row", label: "開始行（0始まり）", type: "integer", min: 0, max: 100000000, default: 0 },
          { path: "to_row", label: "最終行（省略は最後まで）", type: "json", default: null, help: "0以上の整数、または null。指定した行を含みます。" },
          { path: "every", label: "適用間隔（行）", type: "integer", min: 1, max: 100000000, default: 1 },
          { path: "probability", label: "適用確率 (0〜1)", type: "number", min: 0, max: 1, step: "any", default: 1 },
          { path: "when", label: "発生条件（JSON）", type: "json", default: null, help: "対象行を他の項目の値で絞り込みます。条件を付けない場合は null にします。" },
          { path: "bypass_validation", label: "型制約外の値も再現", type: "boolean", default: false, help: "取込側のエラー処理を確認する場合にのみ有効にします。" },
        ],
      },
    ],
  };

  window.FactoryPresetConfig = {
    title: "設備とレジスターの編集",
    description: "設備台数、Modbusの番地と変換、OPC UAの品質や切断条件を設定します。",
    summarize,
    sections: [
      {
        title: "公開プロファイルと運転条件",
        description: "保存済みの公開プロファイルを選び、設備状態を更新する周期と運転の上限を設定します。",
        fields: [
          { path: "profile_id", label: "設備の公開プロファイル", type: "connection", default: "default", help: "OPC UA・Modbusの有効化、待受ポート、認証をまとめた設定です。" },
          { path: "interval_ms", label: "設備状態の更新周期 (ms)", type: "integer", min: 10, max: 60000, default: 1000, help: "1000 msなら約1秒に1回、模擬設備の値を更新します。" },
          { path: "max_ticks", label: "停止までの更新回数", type: "integer", min: 0, max: 100000000, default: 0, help: "0は回数無制限です。正の値を指定すると、その回数で運転を終了します。" },
          { path: "storage_limit_mb", label: "アプリの保存領域上限 (MiB)", type: "integer", min: 16, max: 102400, default: 1024, help: "アプリのデータ領域全体の上限です。超過すると運転を停止し、保存済みの記録は保持します。" },
        ],
      },
      {
        title: "設備の構成",
        description: "設備番号は1から連番で割り当てます。OPC UAのノードは生成項目から作り、公開先はプロファイルで選びます。",
        fields: [
          { path: "equipment.devices", label: "設備台数", type: "integer", min: 1, max: 247, default: 4, help: "ModbusのデバイスID、OPC UAの設備オブジェクトに共通の台数です。" },
        ],
      },
      {
        title: "Modbus レジスター表",
        description: "1行は生成項目と読取番地の対応です。番地は0始まりです。32ビット値は2番地、64ビット値は4番地を使います。",
        fields: [
          {
            path: "equipment.registers",
            label: "レジスターマッピング",
            type: "table",
            max: 100,
            default: newRegister,
            columns: [
              {
                path: "field",
                label: "生成項目",
                type: "text",
                suggestions: (spec) => generatorFields(spec).filter((field) => typeof field?.name === "string" && (numericTypes.has(field.data_type) || ["boolean", "string"].includes(field.data_type))).map((field) => field.name),
                help: "数値・真偽値の項目、または数値への変換表がある文字列項目を指定します。",
              },
              { path: "area", label: "領域", type: "select", options: areas, default: "holding", help: "coil / discrete を選んだら形式は bool にします。" },
              { path: "address", label: "先頭番地", type: "integer", min: 0, max: 65535, default: 0, help: "0〜65535。同じ領域では複数番地を占有する形式の終点も考慮します。" },
              { path: "encoding", label: "形式", type: "select", options: ["uint16", "int16", "uint32", "int32", "float32", "float64", "bool"], default: "float32", help: "リーダー側と同じビット幅・符号で揃えます。" },
              { path: "byte_order", label: "バイト順", type: "select", options: orders, default: "big", help: "各16ビット語の中でのバイトの並び順です。" },
              { path: "word_order", label: "ワード順", type: "select", options: orders, default: "big", help: "32・64ビット値を分割した16ビット語の並び順です。" },
              { path: "scale", label: "倍率", type: "number", step: "any", default: 1, help: "格納値 = 生成値 × 倍率 + 加算値。" },
              { path: "offset", label: "加算値", type: "number", step: "any", default: 0 },
              { path: "enum_values", label: "文字列→数値", type: "json", default: {}, placeholder: '{"ok": 0, "warning": 1}', help: "文字列状態を数値レジスターに写すときに指定します。" },
            ],
          },
        ],
      },
      {
        title: "品質・切断・応答遅延",
        description: "tickは更新回数です。設定した区間を過ぎると品質や待受は通常動作に戻ります。",
        fields: [
          {
            path: "equipment.quality", label: "OPC UA 品質", type: "select", default: "Good",
            options: [
              { value: "Good", label: "正常 (Good)" },
              { value: "BadSensorFailure", label: "センサー故障 (BadSensorFailure)" },
              { value: "UncertainLastUsableValue", label: "前回の有効値 (UncertainLastUsableValue)" },
            ],
          },
          { path: "equipment.quality_from_tick", label: "品質変更の開始 tick", type: "integer", min: 0, default: 0, help: "0は開始直後から適用します。" },
          { path: "equipment.quality_until_tick", label: "品質変更の終了 tick", type: "integer", min: 0, default: 0, help: "0は最後まで適用します。" },
          { path: "equipment.offline_from_tick", label: "切断を始める tick", type: "integer", min: 0, default: 0, help: "0で無効。同じ番地とノードでの再接続を試せます。" },
          { path: "equipment.offline_ticks", label: "切断が続く tick 数", type: "integer", min: 1, max: 10000, default: 5 },
          { path: "equipment.read_delay_ms", label: "Modbus 読取応答の遅延 (ms)", type: "integer", min: 0, max: 5000, default: 0 },
          { path: "equipment.writable", label: "クライアントの書き込みを許可", type: "boolean", default: false, help: "書き込んだ値は次の生成 tick で更新されます。" },
        ],
      },
      generationSection,
      anomalySection,
    ],
  };
})();

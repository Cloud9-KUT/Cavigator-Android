function CGIResponse(res) {
    var v = {};
    var line_num = 0;
    var r = res.split("\n");

    // フォーマットの簡易チェック
    if (r.length < 3) {
        console.log("レスポンスの形がおかしい");
        return null;
    }

    var m = r[line_num].match(/Code:\s+([a-zA-Z])(\d{3})/);
    if (m == undefined) {
        console.log("レスポンスのCode行がおかしい");
        return null;
    }

    // リクエストが成功かどうか
    if (m[1].charAt(0) == 'C') {
        v.isSuccess = true;
    } else if (m[1].charAt(0) == 'E') {
        v.isSuccess = false;
    }

    // ヘッダ
    var line;
    while ((line = r[line_num++])) {
        // 空行の判定
        if (line.length == 1 && line.charAt(0)) break;

        m = line.match(/(.+):\s+(.+)/);

        // key: valueの形式でなければ飛ばす
        if (m == undefined) continue;

        v[m[1]] = m[2];
    }

    // 本体
    v.Response = r[line_num++];
    while (line_num < r.length) {
        v.Response += "\n" + r[line_num++];
    }

    v.print = function() {
        for (var k in this) {
            if (typeof(this[k]) != "function")
                console.log(k + ": '" + this[k] + "'");
        }
    };

    return v;
}
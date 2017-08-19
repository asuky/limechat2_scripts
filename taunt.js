// 設定を読み込む
var requirements = ['taunt_config.js', 'taunt_src.js'];
for (var eachFile in requirements) {
    var required = openFile(userScriptPath+"\\lib\\" + requirements[eachFile]);
    eval(required.readAll());
    required.close();
}

// グローバル変数宣言
var tc;

function event::onLoad()
{
    tc = new TauntController();
    tc.initialize(tauntConfig.taunt_dir);
}

// 有効サーバで発言時に発火
function event::onChannelText(prefix, channel, text)
{
    // 入力が1桁のときのみ、0で埋めて2桁扱いにして
    // 下に流す
    if ((ret = text.match(/^[0-9]{1}$/)) != null) {
        text = '0' + text;
    }
    // 半角数値のみを打ち込まれたときのみ分岐
    if ((ret = text.match(/^[0-9]+$/)) != null) {
        tc.lookup(ret[0]);
        return;
    }
    
    // !muteと!nomuteで鳴らすかを管理
    // IRCのaway機能を使わせて頂く
    if ((ret = text.match(/^\!mute$/)) != null
        && !myAwayStatus) {
        away("Mute!");
        return;
    }
    
    if ((ret = text.match(/^\!nomute$/)) != null
        && myAwayStatus) {
        away();
        return;
    }
}
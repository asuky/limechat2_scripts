// �ݒ��ǂݍ���
var requirements = ['taunt_config.js', 'taunt_src.js'];
for (var eachFile in requirements) {
    var required = openFile(userScriptPath+"\\lib\\" + requirements[eachFile]);
    eval(required.readAll());
    required.close();
}

// �O���[�o���ϐ��錾
var tc;

function event::onLoad()
{
    tc = new TauntController();
    tc.initialize(tauntConfig.taunt_dir);
}

// �L���T�[�o�Ŕ������ɔ���
function event::onChannelText(prefix, channel, text)
{
    // ���͂�1���̂Ƃ��̂݁A0�Ŗ��߂�2�������ɂ���
    // ���ɗ���
    if ((ret = text.match(/^[0-9]{1}$/)) != null) {
        text = '0' + text;
    }
    // ���p���l�݂̂�ł����܂ꂽ�Ƃ��̂ݕ���
    if ((ret = text.match(/^[0-9]+$/)) != null) {
        tc.lookup(ret[0]);
        return;
    }
    
    // !mute��!nomute�Ŗ炷�����Ǘ�
    // IRC��away�@�\���g�킹�Ē���
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
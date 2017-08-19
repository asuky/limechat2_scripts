function TauntController() {
    
    this.objWmp = null;
    this.objDir = null;
    this.tauntDir = null;
    
    this.initialize = function(taunt_path)
    {
        // 必要なActiveXObjectを作成する
        this.objWmp = new ActiveXObject('WMPlayer.OCX');
        this.objDir = new ActiveXObject('Scripting.FileSystemObject');
        this.tauntDir = taunt_path;
        return;
    };
    
    this.lookup = function(num)
    {
        // tauntディレクトリを開く
        var dir = this.objDir.GetFolder(this.tauntDir);
        
        // tauntは「<半角数値> ファイル名.mp3」、前の半角数値（桁数不問）に引っ掛ける正規表現を作成
        var reg = new RegExp("^" + num + " .*");
        
        // フォルダを走査して該当するtauntを探す
        for (var e = new Enumerator(dir.Files); !e.atEnd(); e.moveNext()) {
            eachTaunt = e.item().Name;
            if ((ret = eachTaunt.match(reg)) != null) {
                this.play(this.tauntDir + ret[0]);
            }
        }
    }
    
    this.play = function(path)
    {
        // 何らかの理由でWMPオブジェクトが無いか
        // !muteのときは再生しない
        if (this.objWmp == null || myAwayStatus) { return; }
        
        // WMPオブジェクトが 0 か 1 (Stopped) のときのみ再生する
        if (this.objWmp.PlayState == 0 ||
            this.objWmp.PlayState == 1) {
            this.objWmp.URL = path;
            this.objWmp.Controls.Play();
        }
    }
}
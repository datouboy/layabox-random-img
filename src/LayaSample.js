(function(){
	var Sprite  = Laya.Sprite;
	var Stage   = Laya.Stage;
	var Texture = Laya.Texture;
	var Browser = Laya.Browser;
	var Handler = Laya.Handler;
	var WebGL   = Laya.WebGL;
    var Event   = Laya.Event;
    var Loader  = Laya.Loader;
    var SoundManager = Laya.SoundManager;

    var pageWidth  = Browser.clientWidth;
    var pageHeight = Browser.clientHeight;

	(function(){
		// 不支持WebGL时自动切换至Canvas
		Laya.init(Browser.clientWidth, Browser.clientHeight, WebGL);
        //性能统计面板的调用
        //Laya.Stat.show(0,0);

		Laya.stage.alignV = Stage.ALIGN_MIDDLE;
		Laya.stage.alignH = Stage.ALIGN_CENTER;

        Laya.stage.screenAdaptationEnabled = false;

		Laya.stage.scaleMode = "showall";
		Laya.stage.bgColor   = "#ffe241";

        //加载静态文件资源
        var imgArray = ['bg.gif','title.png','hua_1.png','hua_2.png','hua_3.png','hua_4.png','hua_5.png','hua_6.png','qrcode.png','kuang.png','menu.png','menu_2_3.png','menu_2_2.png','menu_2_1.png','menu_2_0.png','z_1.jpg','z_2.jpg','z_3.jpg'];
        var atlasArray = [];//['game_hua_l1.atlas'];
        var soundsArray = [];
        var assets = [];
        //图片
        imgArray.forEach(function(val) {
            assets.push({
                url: ossUrl + 'res/images/' + val,
                type: Loader.IMAGE
            });
        }, this);
        //动画图集
        atlasArray.forEach(function(val) {
            assets.push({
                url: ossUrl + 'res/atlas/images/' + val,
                type: Loader.ATLAS
            });
        }, this);
        //加载音效
        soundsArray.forEach(function(val) {
            assets.push({
                url: ossUrl + 'res/sounds/' + val,
                type: Loader.SOUND
            });
        }, this);
        
        //加载(加载完成后执行init()函数)
		Laya.loader.load(assets, Handler.create(this, init),  Handler.create(this, onLoading, null, false), Loader.TEXT);
        // 侦听加载失败
		Laya.loader.on(Event.ERROR, this, onError);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //绘制进度条
        loadBG = new Sprite();
        Laya.stage.addChild(loadBG);
        var path =  [
            ["moveTo", 8, 0], //画笔的起始点，
            ["arcTo", 0, 0, 0, 8, 8], //p1（500,0）为夹角B，（500,30）为端点p2
            ["arcTo", 0, 16, 8, 16, 8],
            ["lineTo", 200, 16],
            ["arcTo", 208, 16, 208, 8, 8],
            ["arcTo", 208, 0, 200, 0, 8],
            ["lineTo", 8, 0]
        ];
        loadBG.graphics.drawPath((pageWidth-208)/2, Math.round(pageHeight/2.5) - 10, path, {fillStyle: "#feecd1"});

        //绘制圆角矩形(进度条背景)
        loadTiao = new Sprite();
        Laya.stage.addChild(loadTiao);
        var path =  [
            ["moveTo", 4, 0], //画笔的起始点，
            ["arcTo", 0, 0, 0, 4, 4], //p1（500,0）为夹角B，（500,30）为端点p2
            ["arcTo", 0, 8, 4, 8, 4],
            ["lineTo", 4, 8],
            ["arcTo", 8, 8, 8, 4, 4],
            ["arcTo", 8, 0, 4, 0, 4],
            ["lineTo", 4, 0]
        ];
        loadTiao.graphics.drawPath((pageWidth-208)/2 + 4, Math.round(pageHeight/2.5) - 6, path, {fillStyle: "#c91522"});

        //init();//这里不用加载了，在监听函数中加载
	})();

    //加载静态资源完成，开始初始化游戏
    function init(){
        //加载背景图
        Laya.loader.load(ossUrl+"res/images/bg.gif", Laya.Handler.create(this, stageAdd_start_bg));
        function stageAdd_start_bg(){
            start_bg = new Sprite();
            start_bg.loadImage(ossUrl+"res/images/bg.gif", 0, 0, pageWidth, pageWidth*(1500/750));
            Laya.stage.addChild(start_bg);

            startFun();
        }

        function startFun(){
            console.log('初始化游戏');

            //开始画面
            startPage_s = new startPage();
            //Laya.startPage_s = startPage_s;

            //删除进度条
            loadTiao.destroy();
            loadBG.destroy();
        }

        

        //播放背景音乐
        //SoundManager.playMusic(ossUrl+"res/sounds/bg.mp3", 0);
        //SoundManager.setMusicVolume(0.6);
    }

    // 加载进度侦听器
	function onLoading(progress)
	{
        progress = Math.round(progress * 100);
		//console.log("加载进度: " + progress);
        //loadTiao.graphics.clear();
        var OnePercent = (192 - 4)/100;//每百分之一进度的距离
        var addPercent = Math.round(progress * OnePercent);//需要增加的百分比
        var path =  [
            ["moveTo", 4, 0], //画笔的起始点，
            ["arcTo", 0, 0, 0, 4, 4], //p1（500,0）为夹角B，（500,30）为端点p2
            ["arcTo", 0, 8, 4, 8, 4],
            ["lineTo", 4+addPercent, 8],
            ["arcTo", 8+addPercent, 8, 8+addPercent, 4, 4],
            ["arcTo", 8+addPercent, 0, 4+addPercent, 0, 4],
            ["lineTo", 4, 0]
        ];
        loadTiao.graphics.drawPath((pageWidth-208)/2 + 4, Math.round(pageHeight/2.5) - 6, path, {fillStyle: "#fd4f4f"});
	}

    //打印加载失败日志
	function onError(err)
	{
		console.log("加载失败: " + err);
	}

    //获取Get参数值
    function getQueryString(name) {  
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");  
        var r = window.location.search.substr(1).match(reg);  
        if (r != null) return decodeURI(r[2]);  
        return null;  
    }

})();
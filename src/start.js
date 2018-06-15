//开始页面
(function(){
    var Sprite  = Laya.Sprite;
    //var ColorFilter = Laya.ColorFilter;
	var Stage   = Laya.Stage;
	var Texture = Laya.Texture;
	var Browser = Laya.Browser;
	var Handler = Laya.Handler;
	var WebGL   = Laya.WebGL;
    var Event   = Laya.Event;

    var pageWidth  = Browser.clientWidth;
    var pageHeight = Browser.clientHeight;

    var start_menu;//按钮
    var show_img;//图片切换Sprite
    var switch_OnOff = true;//是否切换
    var imgI;//当前选中图片

    function startPage() {
        var _this = this;
        _this.startInit();
    }

    Laya.class(startPage, "startPage", Sprite);

    var _proto = startPage.prototype;

    //开始画面
    _proto.startInit = function(){
        var _this = this;
        console.log('加载完成，游戏开始');

        //加载标题
        start_title = new Sprite();
        start_title.loadImage(ossUrl+"res/images/title.png", pageWidth*0.09, pageHeight*0.015, pageWidth*0.82, (pageWidth*0.82)*(121/619));
        Laya.stage.addChild(start_title);

        //加载装饰1
        start_hua_1 = new Sprite();
        start_hua_1.loadImage(ossUrl+"res/images/hua_1.png", pageWidth*0.007, pageHeight*0.07, pageWidth*0.13, (pageWidth*0.13)*(151/98));
        Laya.stage.addChild(start_hua_1);

        //加载装饰2
        start_hua_2 = new Sprite();
        start_hua_2.loadImage(ossUrl+"res/images/hua_2.png", pageWidth*0.89, pageHeight*0.072, pageWidth*0.1, (pageWidth*0.1)*(121/72));
        Laya.stage.addChild(start_hua_2);

        //加载装饰3
        start_hua_3 = new Sprite();
        start_hua_3.loadImage(ossUrl+"res/images/hua_3.png", pageWidth*0.007, pageHeight*0.74, pageWidth*0.16, (pageWidth*0.16)*(134/120));
        Laya.stage.addChild(start_hua_3);

        //加载装饰4
        start_hua_4 = new Sprite();
        start_hua_4.loadImage(ossUrl+"res/images/hua_4.png", pageWidth*0.07, pageHeight*0.87, pageWidth*0.096, (pageWidth*0.096)*(113/72));
        Laya.stage.addChild(start_hua_4);

        //加载装饰5
        start_hua_5 = new Sprite();
        start_hua_5.loadImage(ossUrl+"res/images/hua_5.png", pageWidth*0.15, pageHeight*0.9, pageWidth*0.61, (pageWidth*0.61)*(122/461));
        Laya.stage.addChild(start_hua_5);

        //加载装饰6
        start_hua_6 = new Sprite();
        start_hua_6.loadImage(ossUrl+"res/images/hua_6.png", pageWidth*0.18, pageHeight*0.77, pageWidth*0.64, (pageWidth*0.64)*(37/482));
        Laya.stage.addChild(start_hua_6);

        //加载QRCode
        start_Qrcode = new Sprite();
        start_Qrcode.loadImage(ossUrl+"res/images/qrcode.png", pageWidth*0.79, pageHeight*0.815, pageWidth*0.2, (pageWidth*0.2)*(216/150));
        Laya.stage.addChild(start_Qrcode);

        //加载内容框
        start_kuang = new Sprite();
        start_kuang.loadImage(ossUrl+"res/images/kuang.png", pageWidth*0.05, pageHeight*0.13, pageWidth*0.9, (pageWidth*0.9)*(770/670));
        Laya.stage.addChild(start_kuang);

        //加载按钮
        start_menu = new Sprite();
        start_menu.loadImage(ossUrl+"res/images/menu.png");
        start_menu.scaleX = (pageWidth*0.42)/318;
        start_menu.scaleY = (pageWidth*0.42)/318;
        start_menu.x = pageWidth*0.29;
        start_menu.y = pageHeight*0.82;
        Laya.stage.addChild(start_menu);

        //加载切换图片
        show_img = new Sprite();
        show_img.loadImage(ossUrl+"res/images/z_1.jpg");
        show_img.scaleX = (pageWidth*0.81333)/610;
        show_img.scaleY = (pageWidth*0.81333)/610;
        show_img.x = pageWidth*0.09333;
        show_img.y = pageHeight*0.157;
        Laya.stage.addChild(show_img);

        //监听事件(开始游戏)
        start_menu.on(Event.CLICK, this, gameMenuClick);

        //图片切换按钮点击
        var changeNum = 4;//3次机会
        function gameMenuClick(){
            start_menu.graphics.clear();
            if(switch_OnOff){
                switch_OnOff = false;
                start_menu.graphics.loadImage(ossUrl+"res/images/menu_2_"+(changeNum-1)+".png");
                changeNum--;

                //$('#imgPrint').html('<img src="./res/images/pic/z_'+imgI+'.jpg" />');
                $('#imgPrint').html('<img src="http://wechat.sinocontact.com/momo/game_61_img/'+imgI+'" />');
                $('#imgPrint').show();
            }else{
                if(changeNum > 0){
                    switch_OnOff = true;
                    start_menu.graphics.loadImage(ossUrl+"res/images/menu.png");
                    $('#imgPrint').hide();
                }else{
                    switch_OnOff = false;
                    start_menu.graphics.loadImage(ossUrl+"res/images/menu_2_0.png");
                }
            }
        }

        //开始游戏
        _proto.gameRun();

    }

    //游戏运行主功能
    _proto.gameRun = function (){
        var _this = this;
        //切换用的图片
        var picArray = ['z_1.jpg','z_2.jpg','z_3.jpg','z_4.jpg','z_5.jpg','z_6.jpg','z_7.jpg','z_8.jpg','z_9.jpg','z_10.jpg','z_11.jpg','z_12.jpg','z_13.jpg','z_14.jpg','z_15.jpg','z_16.jpg','z_17.jpg','z_18.jpg','z_19.jpg','z_20.jpg','z_21.jpg','z_22.jpg','z_23.jpg','z_24.jpg','z_25.jpg','z_26.jpg','z_27.jpg','z_28.jpg','z_29.jpg'];

        //开始主时间循环
        $('#nameText').show();
        Laya.timer.loop(1, _this, gameRunPlay);
        //主时间循环
        var num = 0;//用于控制循环中的切换间隔
        var i = 0;//图片切换数量
        function gameRunPlay(e){
            if(!switch_OnOff){
                return false;
            }
            if(num % 3 == 0){
                //console.log(num);
                show_img.graphics.clear();
                show_img.graphics.loadImage(ossUrl+"res/images/"+picArray[i]);
                i++;
                if(i >= picArray.length){
                    i = 0;
                }
                imgI = i;
            }
            num++;
            if(num >= 100000){
                num = 0;
            }
        }
    }

})();

var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/game/game.js",
	"libs/modules/game/game.native.js",
	"libs/modules/tween/tween.js",
	"libs/modules/res/res.js",
	"bin-debug/enum/bulletType.js",
	"bin-debug/conf.js",
	"bin-debug/enum/dragonDirection.js",
	"bin-debug/enum/dragonEggType.js",
	"bin-debug/enum/dragonType.js",
	"bin-debug/interface/IDragonEgg.js",
	"bin-debug/LoadingUI.js",
	"bin-debug/Main.js",
	"bin-debug/model/armor.js",
	"bin-debug/model/bullet.js",
	"bin-debug/model/bulletLevel.js",
	"bin-debug/model/dragon.js",
	"bin-debug/model/dragonEgg.js",
	"bin-debug/model/fighter.js",
	"bin-debug/model/gameMgr.js",
	"bin-debug/model/mainFighter.js",
	"bin-debug/model/recordMgr.js",
	"bin-debug/model/speed.js",
	"bin-debug/model/viewPort.js",
	"bin-debug/sprites/mainFighterSp.js",
	"bin-debug/test/bulletLevelSpec.js",
	"bin-debug/test/bulletSpec.js",
	"bin-debug/test/dragonEggSpec.js",
	"bin-debug/test/dragonSpec.js",
	"bin-debug/test/fighterSpec.js",
	"bin-debug/test/gameMgrSpec.js",
	"bin-debug/test/mainFighterSpec.js",
	"bin-debug/test/recordMgrSpec.js",
	"bin-debug/test/speedSpec.js",
	"bin-debug/test/testSpec.js",
	//----auto game_file_list end----
];

var window = this;

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    egret_native.requireFiles();
    egret.TextField.default_fontFamily = "/system/fonts/DroidSansFallback.ttf";
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 60,
		scaleMode: "noBorder",
		contentWidth: 480,
		contentHeight: 800,
		showPaintRect: false,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:30,textColor:0x00c200,bgAlpha:0.9",
		showLog: false,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel(egret.TextField.default_fontFamily, 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};
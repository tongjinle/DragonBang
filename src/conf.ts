/// <reference path="./enum/bulletType.ts" />

module DragonConfig {
	//////////////////////////////////////////////////////
	// DRAGON
	//////////////////////////////////////////////////////
	// 龙仔
	export module DRAGON{
		// 龙仔血量
		export var basicHp: number = 75;
	}


	//////////////////////////////////////////////////////
	// DRAGON EGG
	//////////////////////////////////////////////////////
	// 龙蛋
	export module DRAGONEGG {
		// 龙蛋血量
		export var basicHp: number = 50;
		
		// 龙蛋跟视口碰撞次数
		export var popCount :number =3;
	}


	//////////////////////////////////////////////////////
	// ARMOR
	//////////////////////////////////////////////////////
	// 装甲
	export module ARMOR {
		// '等级'与'伤害减免百分比'之间的对应关系
		export var ANIT_DAMAGE_PERC = {
			[1]: .05,
			[2]: .1,
			[3]: .3
		};

		// 每一关最大保存的装甲等级数
		export var SAVED_MAX: number = 2;
	}


	// 能量
	export module ENERGY {
		//区间
		export var INTERVAL: { [index: string]: number } = {
			['min']: 0,
			['max']: 100
		}
	}

	//////////////////////////////////////////////////////
	// BULLET
	//////////////////////////////////////////////////////
	export module BULLET {
		// '类型'与'基础速度和基础威力'之间的对应关系

		export var BASE: { [index: number]: { speed: number, power: number, cooldown: number } } = {
			[BulletType.normal]: {
				speed: 50,
				power: 20,
				// 基础子弹冷却时间
				// 单位为ms
				// 解释:每500ms,可以发射一颗子弹
				// 当speedLevel为等级1的时候,则冷却加速1.2倍.当过去10ms,则认为是冷却了10*1.2=12ms
				cooldown: 500
			}
		}

		// '等级'与'速度加成百分比'之间的对应关系
		export var SPEED = {
			[0]: 1,
			[1]: 1.2,
			[2]: 1.4,
			[3]: 1.8
		};

		// '等级'与'威力加成百分比'之间的对应关系
		export var POWER = {
			[0]: 1,
			[1]: 1.2,
			[2]: 1.4,
			[3]: 2
		};

		// '等级'与'冷却加成百分比'之间的对应关系
		export var COOLDOWN = {
			[0]: 1,
			[1]: 1.2,
			[2]: 1.4,
			[3]: 1.8
		};



		// 每一关最大保存的速度加成等级数
		export var SAVED_SPEED_MAX = 2;

		// 每一关最大保存的威力加成等级数
		export var SAVED_POWER_MAX = 2;
	}

	//////////////////////////////////////////////////////
	// EVENTNAME LIST
	//////////////////////////////////////////////////////
	export module EVENTLIST {
		// 飞机死亡
		export var FIGHTER_DEAD = 'fighter.dead';
		// 龙仔死亡
		export var DRAGON_DEAD = 'dragon.dead';

		// 子弹等级变化
		export var BUTTLE_LEVEL_CHANGED = 'bulletLevel.changed';
		// 子弹死亡
		export var BUTTLE_DEAD = 'buttle.dead';
		// 子弹超出视口
		export var BUTTLE_OUTVIEWPORT = 'buttle.outviewport';
		// 子弹移动
		export var BUTTLE_MOVE = 'buttle.move';
		// 子弹冷却
		export var BUTTLE_COOLDOWN = 'buttle.cooldown';
		// 子弹冷却完成
		export var BUTTLE_COOLDOWN_AFTER = 'buttle.cooldown.after';

		// 龙蛋 破壳
		export var DRAGONEGG_BORN = 'dragonEgg.born';
		// 龙蛋 被攻击
		export var DRAGONEGG_BEHIT = 'dragonEgg.beHit';
		// 龙蛋 撞到视口边缘
		export var DRAGONEGG_BEPOP = 'dragonEgg.bePop';
		// 龙蛋 超出视口
		export var DRAGONEGG_BEOUT = 'dragonEgg.beOut';

	}
}
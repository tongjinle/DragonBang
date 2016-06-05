/// <reference path="./enum/bulletType.ts" />
module DragonConfig {
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

		export var BASE: { [index: number]: { speed: number, power: number } } = {
			[BulletType.normal]: {
				speed: 50,
				power: 20
			}
		}

		// '等级'与'速度加成百分比'之间的对应关系
		export var SPEED = {
			[1]: 1.2,
			[2]: 1.4,
			[3]: 1.8
		};

		// '等级'与'威力加成百分比'之间的对应关系
		export var POWER = {
			[1]: 1.2,
			[2]: 1.4,
			[3]: 2
		};

		// 每一关最大保存的速度加成等级数
		export var SAVED_SPEED_MAX = 2;

		// 每一关最大保存的威力加成等级数
		export var SAVED_POWER_MAX = 2;
	}

	//////////////////////////////////////////////////////
	// EVENTNAME LIST
	//////////////////////////////////////////////////////
	export module EVENT_NAME {
		// 子弹等级变化
		export var BUTTLE_LEVEL_CHANGED = 'bulletLevel.changed';
		// 飞机死亡
		export var FIGHTER_DEAD = 'fighter.dead';
		// 龙仔死亡
		export var DRAGON_DEAD = 'dragon.dead';
		// 子弹死亡
		export var BUTTLE_DEAD = 'buttle.dead';
	}
}
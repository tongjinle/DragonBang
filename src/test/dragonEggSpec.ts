/// <reference path="../../typings/tsd.d.ts"/>

describe('龙蛋', () => {
	var egg: DragonEgg;
	var fighter: MainFighter;
	var recordMgr: RecordMgr = RecordMgr.getInstance();;

	beforeEach(() => {
		egg = new DragonEgg(DragonEggType.dragon, {});
		fighter = new MainFighter();
	});

	afterEach(() => {
		egg.destory();
		fighter.destory();
		recordMgr.init(true);
	});

	it('基础', () => {
		// 龙蛋的hp应该是50
		expect(egg.hp).toBe(50);

		// 反弹次数
		expect(egg.popCount).toBe(3);

	});

	it('破壳', () => {
		// 监听"破壳"事件
		var type: DragonEggType;
		var onEggBorn = (e) => {
			var data = e.data;
			var fighter = data.fighter as MainFighter;
			var egg = data.dragonEgg as DragonEgg;
			type = egg.type;
		};
		var data = {
			['fighter']: fighter,
			['dragonEgg']: egg
		};
		GameMgr.getInstance().addEventListener(DragonConfig.EVENTLIST.DRAGONEGG_BORN, onEggBorn, data);



		egg.beHit(fighter, 60);

		expect(egg.hp).toBe(0);
		expect(egg.isAlive).toBeFalsy();

		expect(type).toBe(DragonEggType.dragon);

	});

	it('被母舰shot到,龙蛋速度反转', () => {
		egg.speed.abs = 100;
		egg.speed.angle = 135;

		var prevSpeedX = egg.speed.x;
		var prevSpeedY = egg.speed.y;
		egg.beHit(fighter, 100);
		expect(egg.speed.x).toBe(-prevSpeedX);
		expect(egg.speed.y).toBe(-prevSpeedY);
	});

	it('碰撞边界', () => {
		egg.speed.abs = 100;
		egg.speed.angle = 135;

		var hasPop = false;
		var hasOut = false;
		var onBePop = (e) => {
			hasPop = true;
		};
		var onBeOut = (e) => {
			hasOut = true;
		}

		GameMgr.getInstance().addEventListener(DragonConfig.EVENTLIST.DRAGONEGG_BEPOP, onBePop, egg);
		GameMgr.getInstance().addEventListener(DragonConfig.EVENTLIST.DRAGONEGG_BEOUT, onBeOut, egg);

		var prevSpeedX = egg.speed.x;
		var prevSpeedY = egg.speed.y;
		// 会反弹的次数
		expect(egg.popCount).toBe(3);
		expect(hasPop).toBeFalsy();

		egg.bePop(true, true);
		expect(egg.popCount).toBe(2);
		expect(hasPop).toBeTruthy();
		// 反弹之后的速度
		expect(egg.speed.x).toBe(-prevSpeedX);
		expect(egg.speed.y).toBe(-prevSpeedY);

		expect(hasOut).toBeFalsy();
		egg.bePop(true, true);
		egg.bePop(true, true);
		egg.bePop(true, true);
		//一定次数之后消失
		expect(hasOut).toBeTruthy();

		GameMgr.getInstance().removeEventListener(DragonConfig.EVENTLIST.DRAGONEGG_BEPOP, onBePop, egg);
		GameMgr.getInstance().removeEventListener(DragonConfig.EVENTLIST.DRAGONEGG_BEOUT, onBeOut, egg);


	});

	it('龙蛋效果', () => {
		var eggList: { [index: string]: DragonEgg } = {
			['dragon']: new DragonEgg(DragonEggType.dragon, { name: 'puman' }),
			['heal']: new DragonEgg(DragonEggType.heal),
			['healMax']: new DragonEgg(DragonEggType.healMax),
			['energy']: new DragonEgg(DragonEggType.energy),
			['uppers']: new DragonEgg(DragonEggType.uppers),
			['power']: new DragonEgg(DragonEggType.power),
			['speed']: new DragonEgg(DragonEggType.speed),
			['revive']: new DragonEgg(DragonEggType.revive)
		};

		recordMgr.init(true);
		// 得到龙仔
		eggList['dragon'].effect(fighter);
		expect(recordMgr.getDragonStatus('puman')).toBe(DragonStatus.alive);
		
		// 医疗包
		fighter.hp = 10;
		eggList['heal'] .effect(fighter);
		expect(fighter.hp).toBe(40);
		
		// 医疗包Max
		fighter.hp =10;
		eggList['healMax'].effect(fighter);
		expect(fighter.hp).toBe(100);
		
		// 能量
		fighter.energy =10;
		eggList['energy'].effect(fighter);
		expect(fighter.energy).toBe(40);
		
		// 兴奋剂
		// todo 

		// 子弹威力
		fighter.bulletLevel.powerLevel = 0;
		eggList['power'].effect(fighter);
		expect(fighter.bulletLevel.powerLevel).toBe(1);

		// 子弹冷却速度
		fighter.bulletLevel.speedLevel = 1;
		eggList['speed'].effect(fighter);
		expect(fighter.bulletLevel.speedLevel).toBe(2);

		// 复活币
		eggList['revive'].effect(fighter);
		expect(recordMgr.getResList()['revive']).toBe(1);
	});

});
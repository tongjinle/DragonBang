/// <reference path="../../typings/tsd.d.ts"/>
describe('龙仔', () => {
	var dragon: Dragon;
	var recMgr: RecordMgr = RecordMgr.getInstance();
	var gameMgr: GameMgr = GameMgr.getInstance();

	beforeEach(() => {
		recMgr.init(true);
		recMgr.addDragon(DragonType.puman);

		dragon = new Dragon(DragonType.puman);
	});

	afterEach(() => {
		dragon.destory();
	});

	it('生命', () => {
		expect(dragon.hp).toBe(75);
	});
	it('死亡', () => {
		var isDead: boolean = false;
		var onDragonDead = (e) => {
			isDead = true;
		};
		gameMgr.addEventListener(DragonConfig.EVENTLIST.DRAGON_DEAD, onDragonDead, dragon);

		dragon.dead();

		// 能监听到死亡事件
		expect(isDead).toBeTruthy();

		// 死亡后,在record中应该有反应
		expect(recMgr.getDragonStatus(DragonType.puman)).toBe(DragonStatus.dead);

		gameMgr.removeEventListener(DragonConfig.EVENTLIST.DRAGON_DEAD, onDragonDead, this);

	});

	it('母舰子弹等级的改变对龙仔的影响', () => {
		var fighter = new MainFighter();
		fighter.addDragon(dragon, DragonDirection.left);
		fighter.bulletLevel = new BulletLevel(BulletType.normal);

		expect(fighter.bulletLevel.powerLevel).toBe(0);
		expect(fighter.bulletLevel.speedLevel).toBe(0);
		expect(fighter.bulletLevel.cooldown).toBe(0);
		expect(dragon.bulletLevel.powerLevel).toBe(0);
		expect(dragon.bulletLevel.speedLevel).toBe(0);
		expect(dragon.bulletLevel.cooldown).toBe(0);

		fighter.bulletLevel.powerLevel = 2;
		fighter.bulletLevel.speedLevel = 2;
		fighter.bulletLevel.cooldownLevel = 1;
		expect(fighter.bulletLevel.powerLevel).toBe(2);
		expect(fighter.bulletLevel.speedLevel).toBe(2);
		expect(fighter.bulletLevel.cooldownLevel).toBe(1);

		expect(dragon.bulletLevel.powerLevel).toBe(1);
		expect(dragon.bulletLevel.speedLevel).toBe(1);
		expect(dragon.bulletLevel.cooldownLevel).toBe(0);
	});

	it('母舰的死亡会导致龙仔的被动死亡', () => {
		var fighter = new MainFighter();
		fighter.addDragon(dragon, DragonDirection.left);

		fighter.dead();
		expect(dragon.isAlive).toBeFalsy();

	});

	it('特殊技能', () => {
		// 扑满
		// 产生一个特殊的"扑满"子弹,它监听属于它自己的'子弹碰撞'事件,如果碰撞到了,则有可能得到金币


		// 幻影
		// 闪电
		// 产生一个特殊的"闪电"子弹

		// 牧师
		// 加农
		// 雷区(坏小子)
	});

});
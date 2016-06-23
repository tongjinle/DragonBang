/// <reference path="../../typings/tsd.d.ts"/>


describe('母舰', () => {
	var mf: MainFighter;

	beforeEach(() => {
		RecordMgr.getInstance().init(true);
		mf = new MainFighter();
	});

	afterEach(() => {
		mf.destory();
	});

	afterAll(() => {
		RecordMgr.getInstance().init(true);
	});

	it('死亡', () => {
		// 母舰的死亡会导致龙仔的共同死亡
		var dr = new Dragon(DragonType.puman);
		mf.addDragon(dr, DragonDirection.left);

		mf.hp -= Infinity;
		expect(mf.isAlive).toBeFalsy();
		expect(dr.isAlive).toBeFalsy();
	});

	it('能量', () => {
		expect(mf.energy).toBe(0);
		expect(mf.canBoom).toBeFalsy();

		// 吃到4个能量块,每个30能量,一共是120能量,被压缩到100(最大是100)
		var ebox: DragonEgg;
		var count = 4;
		for (var i = 0; i < count; i++) {
			ebox = new DragonEgg(DragonEggType.energy);
			ebox.effect(mf);
		}
		expect(mf.energy).toBe(100);
		expect(mf.canBoom).toBeTruthy();

	});

	it('获取龙仔', () => {
		// 龙仔的bulletLevel跟母舰的关系
		var dr = new Dragon(DragonType.puman);
		mf.addDragon(dr, DragonDirection.left);
		mf.bulletLevel = new BulletLevel(BulletType.normal);
		expect(mf.bulletLevel.speedLevel).toBe(0);
		expect(dr.bulletLevel.speedLevel).toBe(0);

		mf.bulletLevel.speedLevel++;
		expect(mf.bulletLevel.speedLevel).toBe(1);
		expect(dr.bulletLevel.speedLevel).toBe(0);

		mf.bulletLevel.speedLevel++;
		expect(mf.bulletLevel.speedLevel).toBe(2);
		expect(dr.bulletLevel.speedLevel).toBe(1);

		// 真实移动范围的改变(交付给精灵类去实现,在此解耦)
	});

	xit('改变队形', () => {
		// 三种队形定义
		// 真实移动范围的改变
	});

	it('发射子弹', () => {
		// 会导致龙仔也发射子弹
		var dr = new Dragon(DragonType.puman);
		mf.addDragon(dr, DragonDirection.left);

		var flag = 0;
		var onDragonShot = function(e){
			var _dr = e.data as Dragon;
			if(dr === _dr){
				flag++;
			}	
		};

		GameMgr.getInstance().addEventListener(DragonConfig.EVENTLIST.DRAGON_SHOT, onDragonShot, null);

		var mf2:MainFighter = new MainFighter();
		mf2.shot();
		expect(flag).toBe(0);

		mf.shot();
		expect(flag).toBe(1);

	});


	it('移动', () => {
		// 会导致龙仔也跟随移动
		var dr = new Dragon(DragonType.puman);
		dr.x = 100;
		dr.y = 100;
		mf.addDragon(dr, DragonDirection.left);

		var flag = 0;
		var onDragonMove = function(e){
			var _dr = e.data as Dragon;
			if(dr === _dr){
				flag++;
			}
		};

		GameMgr.getInstance().addEventListener(DragonConfig.EVENTLIST.DRAGON_MOVE, onDragonMove, null);

		var mf2: MainFighter = new MainFighter();
		mf2.speed.abs = 100;
		mf2.speed.angle = 90;
		mf2.move();
		expect(flag).toBe(0);
		expect(dr.x).toBe(100);
		expect(dr.y).toBe(100);

		mf.speed.abs = 100;
		mf.speed.angle = 90;
		mf.move();
		expect(flag).toBe(1);
		expect(dr.x).toBe(100);
		expect(dr.y).toBe(200);

	});

	xit('施放技能(转移到dragon中去测试了)', () => {

	});
});
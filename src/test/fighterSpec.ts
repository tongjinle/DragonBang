/// <reference path="../../typings/tsd.d.ts"/>


describe('飞机', () => {
	var fighter: Fighter = null;

	beforeEach(() => {
		fighter = new MainFighter();
	});

	afterEach(() => {
		fighter.destory();
	});

	it('生命', () => {
		fighter.hp = 100;
		fighter.hp -= 20;
		expect(fighter.hp).toBe(80);

		fighter.hp -= 200;
		expect(fighter.hp).toBe(0);
		expect(fighter.isAlive).toBeFalsy();
	});

	it('死亡', () => {
		fighter.hp = 100;
		var fighter2 = new MainFighter();
		fighter2.hp = 100;
		
		var flag = 0;
		var onFighterDead = function(e){
			var fi = e.data as Fighter;
			if (fi === this) {
				flag++;
			}
		};

		// 测试死亡是否只监听自己
		GameMgr.getInstance().addEventListener(DragonConfig.EVENTLIST.FIGHTER_DEAD, onFighterDead, fighter2);
		fighter.hp -= Infinity;
		expect(flag).toBe(0);

		fighter2.hp -= Infinity;
		expect(flag).toBe(1);

	});

	it('子弹颜色', () => {
		fighter.color = armyColor.red;
		var bullet: Bullet = fighter.shot();
		expect(bullet.color).toBe(armyColor.red);
	});


	it('移动', () => {
		fighter.speed = new Speed();
		fighter.speed.abs = 100;
		fighter.speed.angle = 90;
		fighter.move();
		expect(fighter.y).toBe(100);
	});

	it('边界', () => {

	});
});
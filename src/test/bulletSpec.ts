/// <reference path="../../typings/tsd.d.ts"/>


describe('子弹', () => {

	var bullet: Bullet;

	beforeEach(() => {
		var x: number = 100;
		var y: number = 100;
		var power: number = 100;
		var speed = new Speed();
		speed.abs = 10;
		speed.angle = 90;

		bullet = new Bullet(x, y, power, speed);
	});
	
	it('移动', () => {
		bullet.move();
		expect(bullet.y).toBe(110);

		bullet.speed.angle = 120;
		bullet.move();
		expect(bullet.x).toBe(95);
	});



	it('移动监听', () => {
		var moveCount = 0;
		var onBullteMoveComplete = (e) => {
			moveCount++;
		};
		GameMgr.getInstance().addEventListener(DragonConfig.EVENTLIST.BUTTLE_MOVE, onBullteMoveComplete, bullet);
		var height: number = 120;
		bullet.move();
		bullet.move();
		expect(moveCount).toBe(2);
		bullet.move();
		expect(moveCount).toBe(3);
		GameMgr.getInstance().removeEventListener(DragonConfig.EVENTLIST.BUTTLE_MOVE, onBullteMoveComplete, bullet);
	});

	it('生命和撞击', () => {
		bullet.hp = 50;
		bullet.beHit(10);
		expect(bullet.hp).toBe(40);
		expect(bullet.isAlive).toBeTruthy();

		bullet.beHit(100);
		expect(bullet.hp).toBe(0);
		expect(bullet.isAlive).toBeFalsy();
	});

});
/// <reference path="../../typings/tsd.d.ts"/>

describe('speed', () => {
	it('初始化', () => {
		var speed;
		speed = new Speed();
		speed.abs = 100;
		speed.angle = 90;
		expect(speed.x).toBe(0);
		expect(speed.y).toBe(100);


		speed = new Speed();
		speed.abs = 100;
		speed.angle = 60;
		expect(speed.x).toBe(50);

		speed = new Speed();
		speed.abs = 100;
		speed.angle = 120;
		expect(speed.x).toBe(-50);


	});

	it('根据一个目标点,调整角度',()=>{
		var speed = new Speed();
		speed.abs = 100;
		speed.adjustAngle(0, 0, 1, Math.sqrt(3));
		expect(speed.angle).toBe(60);
		expect(speed.x).toBe(50);
	});
});
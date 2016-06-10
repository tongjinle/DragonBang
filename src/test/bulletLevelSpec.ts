describe('子弹等级', () => {
	var bulletLevel: BulletLevel;
	var base: { speed: number, power: number, cooldown: number };
	
	beforeEach(() => {
		bulletLevel = new BulletLevel(BulletType.normal);
		base = DragonConfig.BULLET.BASE[BulletType.normal];
	});
	
	afterEach(()=>{
		bulletLevel.destory();
	})

	it('子弹等级.基础', () => {
		// 默认等级为0
		expect(bulletLevel.powerLevel).toBe(0);
		expect(bulletLevel.speedLevel).toBe(0);

		expect(bulletLevel.baseCooldown).toBe(base.cooldown);

		expect(bulletLevel.power).toBe(base.power * DragonConfig.BULLET.POWER[bulletLevel.powerLevel]);
		expect(bulletLevel.speed.abs).toBe(base.speed * DragonConfig.BULLET.SPEED[bulletLevel.speedLevel]);


	});

	it('等级变化', () => {
		bulletLevel.powerLevel = 1;
		expect(bulletLevel.power).toBe(base.power * DragonConfig.BULLET.POWER[bulletLevel.powerLevel]);

		bulletLevel.speedLevel = 1;
		expect(bulletLevel.speed.abs).toBe(base.speed * DragonConfig.BULLET.SPEED[bulletLevel.speedLevel]);

	});

	it('冷却', () => {
		expect(bulletLevel.cooldown).toBe(0);
		expect(bulletLevel.baseCooldown).toBe(base.cooldown);
		bulletLevel.shot();
		expect(bulletLevel.cooldown).toBe(bulletLevel.baseCooldown);

		var dt: number = 20;
		GameMgr.getInstance().fire(DragonConfig.EVENT_NAME.BUTTLE_COOLDOWN, dt);
		expect(bulletLevel.cooldown).toBe(bulletLevel.baseCooldown - 20);

		bulletLevel.coolDownLevel = 1;
		GameMgr.getInstance().fire(DragonConfig.EVENT_NAME.BUTTLE_COOLDOWN, dt);
		expect(bulletLevel.cooldown).toBe(bulletLevel.baseCooldown - 20 - Math.round(20 * 1.2));
	});


});
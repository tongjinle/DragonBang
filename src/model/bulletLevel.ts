class BulletLevel {
	// 子弹 速度等级
	private _speedLevel: number;
	public get speedLevel(): number {
		return this._speedLevel;
	}
	public set speedLevel(v: number) {
		this._speedLevel = v;

		var ratio: number;
		ratio = DragonConfig.BULLET.SPEED[this._speedLevel];
		this.speed.x = this.baseSpeed.x * ratio;
		this.speed.y = this.baseSpeed.y * ratio;

		GameMgr.getInstance().fire(DragonConfig.EVENT_NAME.BUTTLE_LEVEL_CHANGED, this);
	}


	// 子弹 威力等级
	private _powerLevel: number;
	public get powerLevel(): number {
		return this._powerLevel;
	}
	public set powerLevel(v: number) {
		this._powerLevel = v;

		var ratio: number;
		ratio = DragonConfig.BULLET.POWER[this._powerLevel];
		this.power = this.basePower * ratio;
		GameMgr.getInstance().fire(DragonConfig.EVENT_NAME.BUTTLE_LEVEL_CHANGED, this);
	}


	// 子弹 基础速度
	baseSpeed: Speed;
	// 子弹 当前速度
	speed: Speed;

	// 子弹 基础威力
	basePower: number;
	// 子弹 当前威力
	power: number;


	constructor(bulletType: BulletType) {
		var conf = DragonConfig.BULLET.BASE[bulletType];

		this.baseSpeed = new Speed();
		this.baseSpeed.abs = conf.speed;

		this.basePower = conf.power;
	}
}
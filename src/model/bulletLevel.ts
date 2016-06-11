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
		this.speed.abs = this.baseSpeed.abs * ratio;

		GameMgr.getInstance().fire(DragonConfig.EVENTLIST.BUTTLE_LEVEL_CHANGED, this);
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
		GameMgr.getInstance().fire(DragonConfig.EVENTLIST.BUTTLE_LEVEL_CHANGED, this);
	}


	// 子弹 冷却等级
	private _coolDownLevel: number;
	public get coolDownLevel(): number {
		return this._coolDownLevel;
	}
	public set coolDownLevel(v: number) {
		this._coolDownLevel = v;
		this.cooldownRatio = DragonConfig.BULLET.COOLDOWN[this._coolDownLevel];
	}
	// 子弹 冷却比例
	private cooldownRatio: number;
	// 子弹 基础冷却时间
	baseCooldown: number;
	// 子弹 当前冷却时间
	private _cooldown: number;
	public get cooldown(): number {
		return this._cooldown;
	}
	public set cooldown(v: number) {
		this._cooldown = Math.max(0, v);
		if (this._cooldown == 0) {
			GameMgr.getInstance().fire(DragonConfig.EVENTLIST.BUTTLE_COOLDOWN_AFTER, this);
		}
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
		this.speed = new Speed();
		this.baseSpeed.abs = conf.speed;
		this.speedLevel = 0;

		this.basePower = conf.power;
		this.powerLevel = 0;

		this.baseCooldown = conf.cooldown;
		this.cooldown = 0;
		this.coolDownLevel = 0;

		this.bindListener();
	}

	// 是否能发射
	public get canShot(): boolean {
		return this.cooldown == 0;
	}

	// 发射
	shot(): void {
		this.cooldown = this.baseCooldown;
	}

	// 子弹冷却事件
	private _onButtleCoolDown(e) {
		var dt: number = e.data;
		this.cooldown -= Math.round(dt * this.cooldownRatio);
	}

	private bindListener() {
		GameMgr.getInstance().addEventListener(DragonConfig.EVENTLIST.BUTTLE_COOLDOWN, this._onButtleCoolDown, this);
	}

	private unbindListener() {
		GameMgr.getInstance().removeEventListener(DragonConfig.EVENTLIST.BUTTLE_COOLDOWN, this._onButtleCoolDown, this, false);
	}

	destory() {
		this.unbindListener()
	}
}
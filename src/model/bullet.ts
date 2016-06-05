class Bullet {
	power: number;

	speed: Speed;

	// hp
	private _hp: number;
	public get hp(): number {
		return this._hp;
	}
	public set hp(v: number) {
		this._hp = v;
		this._hp = Math.max(0, this._hp);
		if (this._hp == 0) {
			GameMgr.getInstance().fire(DragonConfig.EVENT_NAME.BUTTLE_DEAD, this);
		}
	}

	public get isAlive(): boolean {
		return this._hp != 0;
	}

	// position
	x: number;
	y: number;

	// 移动
	move() {
		var speed = this.speed;
		this.x += speed.x;
		this.y += speed.y;
	}

	// 被击中
	beHit(power: number) {
		var damage: number = power;

		// damage最小值为1
		damage = Math.max(1, damage);

		// 扣去生命值
		this.hp -= damage;
	}



	constructor(x: number, y: number, power: number, speed: Speed) {
		this.x = x;
		this.y = y;
		this.power = power;
		this.speed = speed;
	}
}

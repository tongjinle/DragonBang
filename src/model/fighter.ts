// 飞机抽象类
abstract class Fighter {
	// hp
	protected _hp: number;
	public get hp(): number {
		return this._hp;
	}
	public set hp(v: number) {
		this._hp = v;
		// 最小为0
		this._hp = Math.max(0, this._hp);

		GameMgr.getInstance().fire(DragonConfig.EVENT_NAME.FIGHTER_DEAD, this);
	}


	// 是否存活
	public get isAlive(): boolean {
		return this._hp != 0;
	}


	// bullet level
	bulletLevel: BulletLevel;

	// speed
	speed: Speed;

	// armor
	armor: Armor;

	// position
	x: number;
	y: number;

	// 尺寸
	width: number;
	height: number;

	// move
	move() {
		this.x += this.speed.x;
		this.y += this.speed.y;
	}

	// 射击
	shot() {
		// to do
	}

	// 被击中
	beHit(power: number) {

		var damage: number = Math.floor(power * (1 - this.armor.antiDamagePerc));

		// damage最小值为1
		damage = Math.max(1, damage);

		// 扣去生命值
		this.hp -= damage;
	}

}
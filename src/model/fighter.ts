// 飞机抽象类
abstract class Fighter {
	// 阵营颜色
	color: armyColor;
	// hp
	protected _hp: number;
	public get hp(): number {
		return this._hp;
	}
	public set hp(v: number) {
		this._hp = v;
		// 最小为0
		this._hp = Math.max(0, this._hp);
		
		if(this._hp == 0){
			this.dead();
		}
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
	shot():Bullet {
		var bullet = new Bullet(this.x, this.y, this.bulletLevel.power, this.bulletLevel.speed);
		bullet.source = this;
		bullet.color = this.color;

		// 产生shot事件
		GameMgr.getInstance().fire(DragonConfig.EVENTLIST.FIGHTER_SHOT,bullet);

		this.bulletLevel.shot();
		return bullet;
	}

	// 被击中
	beHit(power: number) {

		var damage: number = Math.floor(power * (1 - this.armor.antiDamagePerc));

		// damage最小值为1
		damage = Math.max(1, damage);

		// 扣去生命值
		this.hp -= damage;
	}

	dead(){
		GameMgr.getInstance().fire(DragonConfig.EVENTLIST.FIGHTER_DEAD, this);
		this.destory();
	}


	bindListener(){

	}

	unbindListener(){

	}

	destory(){
		this.unbindListener();
		this.bulletLevel.destory();
	}


	constructor(){
		this.bindListener();
		
		this.x = 0;
		this.y = 0;
		this._hp = 1;
		this.armor = new Armor(0);
		this.bulletLevel = new BulletLevel(BulletType.normal); 
		this.speed = new Speed();
	}

}
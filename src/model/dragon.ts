// 龙仔
class Dragon {
	// 母舰
	private _mother : MainFighter;
	public get mother() : MainFighter {
		return this._mother;
	}
	public set mother(v : MainFighter) {
		var mother = this._mother = v;

		this.bulletLevel.powerLevel = Math.max(0,mother.bulletLevel.powerLevel - 1);
		this.bulletLevel.speedLevel = Math.max(0,mother.bulletLevel.speedLevel - 1);
	}

	bulletLevel: BulletLevel;

	type: DragonType;


	// 位置
	x: number;
	y: number;


	// 生命
	private _hp : number;
	public get hp() : number {
		return this._hp;
	}
	public set hp(v : number) {
		this._hp = Math.max(0,v);

		if(this._hp==0){
			this.dead();
		}
	}

	public get isAlive() : boolean {
		return this._hp != 0;
	}


	constructor(type: DragonType) {
		this.type = type;
		this.bulletLevel = new BulletLevel(BulletType.normal);
		this.hp = DragonConfig.DRAGON.basicHp;

		this.bindListener();
	}

	shot(): Bullet {
		var bullet = new Bullet(this.x, this.y, this.bulletLevel.power, this.bulletLevel.speed);
		return bullet;
	}

	boom() {
	}

	dead(): void {
		this._hp = 0;

		GameMgr.getInstance().fire(DragonConfig.EVENTLIST.DRAGON_DEAD, this);

		// recordMgr记录死亡
		RecordMgr.getInstance().setDragonStatus(this.type, DragonStatus.dead);

		this.destory();
	}

	destory(): void {
		this.unbindListener();
	}

	private onMotherMove():void{}

	private bindListener(): void {
		// 母舰的移动,会带动龙仔的移动
	}


	private unbindListener(): void {

	}
}
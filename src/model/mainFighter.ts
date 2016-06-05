/// <reference path="../conf.ts" />

// 母舰
class MainFighter extends Fighter {
	// 龙仔
	dragons: Dragon[];

	// 能量
	// [0,100]
	private _energy: number;
	public get energy(): number {
		return this._energy;
	}
	public set energy(v: number) {
		this._energy = Math.max(Math.min(v, DragonConfig.ENERGY.INTERVAL['max']), DragonConfig.ENERGY.INTERVAL['min']);
	}




	// 通过母舰的bulletLevel 来设置龙仔的bulletLevel
	private _resetDragonBulletLevel() {
		var bulletLevel = this.bulletLevel;
		for (let dragon of this.dragons) {
			dragon.bulletLevel.speedLevel = Math.max(1, bulletLevel.speedLevel);
			dragon.bulletLevel.powerLevel = Math.max(1, bulletLevel.powerLevel);
		}
	}


	boom(whichDragon: dragonDirection) {
		var dragon = this.dragons[whichDragon];
		if (!dragon) {
			throw 'no such dragon';
		}
		if (this.energy != DragonConfig.ENERGY.INTERVAL['max']) {
			throw "not enough energy";
		}

		dragon.boom();
	}


	// 转换队形
	transform() { }

	// 增加龙仔
	addDragon(dragon: Dragon, direction: dragonDirection) {
		this.dragons[direction] = dragon;
		this._resetDragonBulletLevel();
	}

	initListener(){
		var mgr = GameMgr.getInstance();
		mgr.addEventListener(DragonConfig.EVENT_NAME.BUTTLE_LEVEL_CHANGED, (buttleLevel) => {
			if(buttleLevel === this.bulletLevel){
				this._resetDragonBulletLevel();
			}
		}, this);
	}


	constructor() {
		super();

		this.bulletLevel = new BulletLevel(BulletType.normal);
	}
}
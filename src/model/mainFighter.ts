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

	// 是否有兴奋剂
	isHot: boolean;




	// 通过母舰的bulletLevel 来设置龙仔的bulletLevel
	private _resetDragonBulletLevel() {
		var bulletLevel = this.bulletLevel;
		for (let dragon of this.dragons) {
			dragon.bulletLevel.speedLevel = Math.max(0, bulletLevel.speedLevel - 1);
			dragon.bulletLevel.powerLevel = Math.max(0, bulletLevel.powerLevel - 1);
			dragon.bulletLevel.cooldownLevel = Math.max(0, bulletLevel.cooldownLevel - 1);
		}
	}


	boom(whichDragon: DragonDirection) {
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
	addDragon(dragon: Dragon, direction: DragonDirection) {
		this.dragons[direction] = dragon;
		this._resetDragonBulletLevel();
	}

	private onBulletLevelChanged(e) {
		var bulletLevel = e.data as BulletLevel;
		if (this.bulletLevel === bulletLevel) {
			this._resetDragonBulletLevel();
		}
	}

	private onFighterDead(e) {
		var fighter = e.data as Fighter;
		if (fighter == this) {
			for (let dragon of this.dragons) {
				dragon.dead();
			}
		}
	}



	bindListener() {
		var mgr = GameMgr.getInstance();
		mgr.addEventListener(DragonConfig.EVENTLIST.BUTTLE_LEVEL_CHANGED, this.onBulletLevelChanged, this);

		mgr.addEventListener(DragonConfig.EVENTLIST.FIGHTER_DEAD, this.onFighterDead, this);
	}


	constructor() {
		super();
		this.dragons = [];
		this.bulletLevel = new BulletLevel(BulletType.normal);

		this.bindListener();
	}

}
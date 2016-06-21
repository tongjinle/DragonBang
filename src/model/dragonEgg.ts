/**
 * DragonEgg
 */
interface IEffectFactory { [type: number]: (egg: DragonEgg) => IEffect };
interface IEffect { (fighter: MainFighter): void };
class DragonEgg {

	// 类型    
	type: DragonEggType;
	// 辅助信息
	ext: any;

	// 生命值
	private _hp: number;
	public get hp(): number {
		return this._hp;
	}
	public set hp(v: number) {
		this._hp = Math.max(0, v);
	}


	public get isAlive(): boolean {
		return this.hp != 0;
	}

	// 速度
	speed: Speed;

	// 跟视口碰撞次数
	// 超过碰撞次数,就消失于视口
	popCount: number;


	// 效果
	effect: IEffect;

	// 工厂字典
	static factory: IEffectFactory;

	constructor(type: DragonEggType, ext?: any) {
		DragonEgg.initFactory();

		this.bindListener();

		this.hp = DragonConfig.DRAGONEGG.basicHp;
		this.popCount = DragonConfig.DRAGONEGG.popCount;
		this.type = type;
		this.ext = ext;
		this.speed = new Speed();
		this.effect = DragonEgg.factory[this.type](this);

	}

	beHit(fighter: Fighter, damage: number) {
		// 生命削减
		this.hp -= damage;
		// 速度反转
		this.speed.angle += 180;
		this.speed.y *= -1;

		if (!this.isAlive) {
			GameMgr.getInstance().fire(DragonConfig.EVENTLIST.DRAGONEGG_BORN, {
				fighter: fighter,
				dragonEgg: this
			});
		}
	}


	bePop(isOutX: boolean, isOutY: boolean) {
		if (this.popCount == 0) {
			GameMgr.getInstance().fire(DragonConfig.EVENTLIST.DRAGONEGG_BEOUT, this);
		} else {
			if (!isOutX && !isOutY) {
				return;
			}
			if (isOutX) { this.speed.angle = 180 - this.speed.angle; }
			if (isOutY) { this.speed.angle = -this.speed.angle; }
			this.popCount--;
			GameMgr.getInstance().fire(DragonConfig.EVENTLIST.DRAGONEGG_BEPOP, this);
		}
	}

	// handlers
	// private onBeHit(e: IDragonEggBeHitEvent) {
	// 	this.speed.x *= -1;
	// 	this.speed.y *= -1;
	// }


	private bindListener() {
		// GameMgr.getInstance().addEventListener(DragonConfig.EVENT_NAME.DRAGONEGG_BEHIT, this.onBeHit, this);
	}

	private unbindListener() {
		// GameMgr.getInstance().removeEventListener(DragonConfig.EVENT_NAME.DRAGONEGG_BEHIT, this.onBeHit, this);
	}

	destory() {
		this.unbindListener();
	}

	static initFactory() {
		if (DragonEgg.factory) {
			return;
		}

		var factory: IEffectFactory = DragonEgg.factory = {};
		// 得到龙仔
		factory[DragonEggType.dragon] = (egg) => (fighter) => {
			// 如果母舰有空位,则把龙仔加载到母舰的空位上
			// todo 
			// 记录中增加新的龙仔名称
			RecordMgr.getInstance().addDragon(egg.ext.dragonType);
		};

		// 能量
		factory[DragonEggType.energy] = (egg) => (fighter) => {
			// 能量+30
			fighter.energy += 30;
		}

		// 医疗包
		factory[DragonEggType.heal] = (egg) => (fighter) => {
			// hp+30
			fighter.hp += 30;
		};

		// 医疗包max
		factory[DragonEggType.healMax] = (egg) => (fighter) => {
			// hp+30
			fighter.hp = 100;
		};

		// 兴奋剂
		factory[DragonEggType.uppers] = (egg) => (fighter) => {
			// 攻速提升到200%
			fighter.isHot = true;
		};

		// 子弹威力
		factory[DragonEggType.power] = (egg) => (fighter) => {
			fighter.bulletLevel.powerLevel++;
		};

		// 子弹速度
		factory[DragonEggType.speed] = (egg) => (fighter) => {
			fighter.bulletLevel.speedLevel++;
		};

		// 复活币
		factory[DragonEggType.revive] = (egg) => (fighter) => {
			var recMgr: RecordMgr = RecordMgr.getInstance();
			recMgr.addRes('revive', 1);
		};

	}
}
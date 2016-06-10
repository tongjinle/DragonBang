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
		this._hp = v;
	}
	// 效果
	effect: IEffect;

	// 工厂字典
	static factory: IEffectFactory;

	constructor(type: DragonEggType, ext?: any) {
		DragonEgg.initFactory();

		this.type = type;
		this.ext = ext;
		DragonEgg.factory[this.type](this);

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
			RecordMgr.getInstance().addDragon(egg.ext.name);
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
		factory[DragonEggType.heal] = (egg) => (fighter) => {
			// hp+30
			fighter.hp = 100;
		};

		// 兴奋剂
		factory[DragonEggType.uppers] = (egg) => (fighter) => {
			// 攻速提升到200%
			fighter.isHot = true;
		};

		//
		factory[DragonEggType.power] = (egg) => () => { }

	}
}
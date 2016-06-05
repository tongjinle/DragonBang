// 装甲
class Armor {
	// 装甲等级
	private _level : number;
	// 伤害减免百分比
	private _antiDamagePerc: number;
	public get antiDamagePerc() : number {
		return this._antiDamagePerc;
	}

	public get level() : number {
		return this._level;
	}
	public set level(v : number) {
		this._level = v;
		this._antiDamagePerc = DragonConfig.ARMOR.ANIT_DAMAGE_PERC[this._level];
	}
	constructor(level:number) {
		this.level = level;
	}
}
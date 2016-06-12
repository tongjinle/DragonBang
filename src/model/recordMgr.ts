class RecordMgr {
	static mgr;

	constructor() {

	}

	static getInstance(): RecordMgr {
		var mgr = RecordMgr.mgr = RecordMgr.mgr || new RecordMgr();
		return mgr;
	}

	init(isForce: boolean = false) {
		if (isForce || egret.localStorage.getItem('hasInit') !== '1') {
			egret.localStorage.setItem('dragonList','{}' );
			egret.localStorage.setItem('bulletPowerLevel', '1');
			egret.localStorage.setItem('bulletSpeedLevel', '1');
			egret.localStorage.setItem('armorLevel', '1');
			egret.localStorage.setItem('coin', '0');
			egret.localStorage.setItem('gateList', '[]');
			egret.localStorage.setItem('resList', '{}');
			// 标志
			egret.localStorage.setItem('hasInit', '1');
		}
	}

	// 读取龙仔列表
	getDragonList(): {[type:number]:DragonStatus} {
		return JSON.parse(egret.localStorage.getItem('dragonList'));
	}

	
	// 新增龙仔
	// 如果龙仔没有,则新增
	// 如果有了,活的情况下,增加金币100;死的情况下,复活龙仔
	addDragon(type: DragonType): void {
		var status = this.getDragonStatus(type);
		if(status == DragonStatus.alive){
			this.setCoin(this.getCoin() + 100);
		}else{
			this.setDragonStatus(type, DragonStatus.alive);
		}
	}

	// 读取龙仔状态
	getDragonStatus(type:DragonType) {
		var dragonList = this.getDragonList();
		if (dragonList[type] === undefined) { return DragonStatus.notExist; }
		return dragonList[type];
	}

	// 记录龙仔状态
	setDragonStatus(type:DragonType,status:DragonStatus):void{
		var dragonList = this.getDragonList();
		if(status == DragonStatus.notExist){
			delete dragonList[type];
		}else{
			dragonList[type] = status;
		}

		egret.localStorage.setItem('dragonList', JSON.stringify(dragonList));
	}

	// 读取/设置母舰子弹威力等级
	getBulletPowerLevel(): number {
		return parseInt(egret.localStorage.getItem('bulletPowerLevel'));
	}

	setBulletPowerLevel(powerLevel: number): void {
		egret.localStorage.setItem('bulletPowerLevel', powerLevel.toString());
	}

	// 读取/设置母舰子弹速度等级
	getBulletSpeedLevel(): number {
		return parseInt(egret.localStorage.getItem('bulletSpeedLevel'));
	}

	setBulletSpeedLevel(speedLevel: number): void {
		egret.localStorage.setItem('bulletSpeedLevel', speedLevel.toString());
	}


	// 读取/设置母舰装甲等级
	getArmorLevel(): number {
		return parseInt(egret.localStorage.getItem('armorLevel'));
	}

	setArmoLevel(armorLevel: number): void {
		egret.localStorage.setItem('armorLevel', armorLevel.toString());
	}


	// 读取/设置金币
	getCoin(): number {
		return parseInt(egret.localStorage.getItem('coin'));
	}

	setCoin(coin: number): void {
		egret.localStorage.setItem('coin', coin.toString());
	}

	// 读取通关列表信息
	getGateList(): number[] {
		return JSON.parse(egret.localStorage.getItem('gateList'));
	}

	// 设置某关信息
	setGate(index: number, score: number): void {
		var gateList = this.getGateList();
		gateList[index] = score;
		egret.localStorage.setItem('gateList', JSON.stringify(gateList));
	}

	// 读取物品列表
	getResList(): { [res: string]: number }[] {
		return JSON.parse(egret.localStorage.getItem('resList'));
	}

	// 新增物品
	addRes(res: string, count: number = 1): void {
		var resList = this.getResList();
		resList[res] = resList[res] || 0 ;
		resList[res] += count;
		egret.localStorage.setItem('resList', JSON.stringify(resList));
	}

	// 消耗物品
	removeRes(res: string, count: number = 1): void {
		this.addRes(res, -count);
	}


}
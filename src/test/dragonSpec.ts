/// <reference path="../../typings/tsd.d.ts"/>
describe('龙仔', () => {
	var dragon: Dragon;
	var recMgr: RecordMgr = RecordMgr.getInstance();

	beforeEach(()=>{
		dragon = new Dragon(DragonType.puman);

	});

	afterEach(() => {
		dragon.destory();
	});

	it('生命', () => { 
		expect(dragon.hp).toBe(75);
	});
	it('死亡', () => {
		// 死亡后,在record中应该有反应
		dragon.dead();
		expect(recMgr.getDragonStatus(dragon.type.toString())).toBeFalsy();
	});
	it('复活', () => {
		// 复活后,在record中应该有反应
	});

	it('母舰子弹等级的改变对龙仔的影响', () => { });

	it('母舰的死亡会导致龙仔的被动死亡', () => { });

	it('特殊技能', () => {
		// 
	});
});
/// <reference path="../../typings/tsd.d.ts"/>


describe('游戏信息记录器', () => {
    var mgr = RecordMgr.getInstance();

    beforeEach(()=>{
        mgr.init(true);
    });

    afterAll(() => {
        mgr.init(true);
    });


    it('初始化', () => {
        mgr.init();
        expect(mgr.getCoin()).toBe(0);
        mgr.setCoin(100);
        expect(mgr.getCoin()).toBe(100);
        mgr.init();
        expect(mgr.getCoin()).toBe(100);
        // 强制刷新会清空数据
        mgr.init(true);
        expect(mgr.getCoin()).toBe(0);
    });

    it('龙仔list', () => {
        // 读取list
        expect(mgr.getDragonList()).toEqual({});
        // 新增龙仔
        mgr.addDragon('dragon1');
        mgr.addDragon('dragon2');
        expect(mgr.getDragonList()).toEqual({ 'dragon1':true,'dragon2':true});

        // 龙仔已经有了,且'活着'的状态,那么增加金币
        expect(mgr.getCoin()).toBe(0);
        mgr.addDragon('dragon1');
        expect(mgr.getCoin()).toBe(100);

        // 龙仔已经有了,但是'死亡'的状态,那么复活龙仔
        mgr.setDragonStatus('dragon1', false);
        expect(mgr.getDragonStatus('dragon1')).toBeFalsy();
        mgr.addDragon('dragon1');
        expect(mgr.getCoin()).toBe(100);
        expect(mgr.getDragonStatus('dragon1')).toBeTruthy();
    });

    it('母舰子弹威力', () => {
        expect(mgr.getBulletPowerLevel()).toBe(1);
        mgr.setBulletPowerLevel(2);
        expect(mgr.getBulletPowerLevel()).toBe(2);
    });

    it('母舰子弹速度', () => {
        expect(mgr.getBulletSpeedLevel()).toBe(1);
        mgr.setBulletSpeedLevel(2);
        expect(mgr.getBulletSpeedLevel()).toBe(2);
    });

    it('母舰装甲', () => {
        expect(mgr.getArmorLevel()).toBe(1);
        mgr.setArmoLevel(2);
        expect(mgr.getArmorLevel()).toBe(2);
    });

    it('金币', () => {
        expect(mgr.getCoin()).toBe(0);
        mgr.setCoin(100);
        expect(mgr.getCoin()).toBe(100);
    });

    it('通关信息', () => {
        expect(mgr.getGateList()).toEqual   ([]);
        mgr.setGate(5,100);
        mgr.setGate(3,200);
        expect(mgr.getGateList()).toEqual([null,null,null,200,null,100]);
        
    });

    it('物品栏', () => {
        expect(mgr.getResList()).toEqual({});
        mgr.addRes('box',2);
        mgr.addRes('pencil',100);
        mgr.addRes('box',5);
        mgr.removeRes('pencil');
        expect(mgr.getResList()).toEqual({'box':7,'pencil':99});
    });




});
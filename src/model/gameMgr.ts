class GameMgr extends egret.EventDispatcher {
	static ins: GameMgr;
	constructor() {
		super();
	}

	static getInstance(){
		var ins = GameMgr.ins = GameMgr.ins || new GameMgr();
		return ins;
	}

	fire(eventName:string,data:any){
		this.dispatchEvent(new egret.Event(eventName, false, false, data));
	}
}
class RecordMgr {
	static mgr;
	constructor() {
		
	}

	getInstance (){
		var mgr = RecordMgr.mgr = RecordMgr.mgr || new RecordMgr();
		return mgr;
	}
}
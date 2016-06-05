class Speed {
	// 分速度
	private _x: number;
	public get x() : number {
		return this._x;
	}


	private _y: number;
	public get y() : number {
		return this._y;
	}

	// 角度
	private _angle: number;
	public get angle(): number {
		return this._angle;
	}
	public set angle(v: number) {
		this._angle = v;
	}

	// 直线速度
	private _abs: number;
	public get abs(): number {
		return this._abs;
	}
	public set abs(v: number) {
		this._abs = v;
	}

	private recal() {
		var abs = this._abs;
		var angle = this._angle;
		this._y = Math.sin(angle / Math.PI) * abs;
		this._x = Math.cos(angle / Math.PI) * abs;
	}

	constructor() {
		this._angle = 0;
		this._abs = 0;
		this.recal();
	}

}
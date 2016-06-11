class Speed {
	// 分速度
	private _x: number;
	public get x(): number {
		return this._x;
	}


	private _y: number;
	public get y(): number {
		return this._y;
	}

	// 角度
	private _angle: number;
	public get angle(): number {
		return this._angle;
	}
	public set angle(v: number) {
		this._angle = (v + 360) % 360;
		this.recal();
	}

	// 直线速度
	private _abs: number;
	public get abs(): number {
		return this._abs;
	}
	public set abs(v: number) {
		this._abs = v;
		this.recal();
	}

	// 根据目标点,调整角度
	adjustAngle(x1: number, y1: number, x2: number, y2: number) {
		var angle: number = Math.atan2(y2 - y1, x2 - x1);
		this.angle = Math.round(angle * 180 / Math.PI * 100) / 100;
	}

	private recal() {
		var format = (n: number): number => {
			var flag = n > 0 ? 1 : -1;
			var abs = Math.round(Math.abs(n));
			return abs * flag;
		};
		var abs = this._abs;
		var angle = this._angle;
		var radian = angle / 180 * Math.PI;
		this._y = format(Math.sin(radian) * abs);
		this._x = format(Math.cos(radian) * abs);
	}

	constructor() {
		this._angle = 0;
		this._abs = 0;
		this.recal();
	}

}
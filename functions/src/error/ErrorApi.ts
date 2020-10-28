
// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

export default class ErrorApi extends Error {
	private _status: number = -1;
	private _code: number = -1;

	constructor(status: number, code: number) {
		super();
		this._status = status;
		this._code = code;
	}

	public get status(): number { return this._status; }
	public get code(): number { return this._code; }
}

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------


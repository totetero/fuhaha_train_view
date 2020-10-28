
// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

import * as express from "express";
import ErrorApi from "@server/error/ErrorApi";

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

export default async (error: Error, req: express.Request, res: express.Response, next: express.NextFunction): Promise<express.Response> => {
	let status: number = -1;
	let code: number = -1;

	// エラーの分類
	if (error instanceof ErrorApi) {
		status = error.status;
		code = error.code;
	}

	// エラーログ
	console.error(error);

	// 応答を作成する TODO 型を作成
	const response: any = {
		code: code,
	};

	if (status < 0) { status = 500; }
	return res.status(status).send(response);
};

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------


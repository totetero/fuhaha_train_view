
// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

import * as express from "express";

import { firestore, } from "@server/firebase/settings";

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

export interface RequestTest {
	hoge: string;
}

export interface ResponseTest {
	fuga: string;
}

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

export default async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<express.Response | void> => {
	try {
		const requestBody: RequestTest = req.body;

		await firestore.collection("users").doc("test").set({
			aaa: "hoge",
			bbb: "fuga",
		});

		const snapshot = await firestore.collection("users").get();
		snapshot.forEach((doc) => console.log("firestore", doc.id, '=>', doc.data()));

		const response: ResponseTest = {
			fuga: requestBody.hoge,
		};

		return res.status(200).send(response);
	} catch(error) {
		return next(error);
	}
};

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------


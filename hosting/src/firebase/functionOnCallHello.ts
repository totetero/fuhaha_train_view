
// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

import * as firebase from "firebase/app";
import { functions, } from "@/firebase/firebaseSetting";

export interface Request {}

export type Response = string;

export default async (request: Request): Promise<Response> => {
	const name: string = "onCallHello";
	const callable: firebase.functions.HttpsCallable = functions.httpsCallable(name);
	const response: firebase.functions.HttpsCallableResult = await callable(request);
	return response.data;
};

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------


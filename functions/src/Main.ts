
// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

//import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import app from "@server/App";

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

export const onRequestHello: functions.HttpsFunction = functions.https.onRequest(async (request: functions.Request, response: functions.Response): Promise<void> => {
	functions.logger.info("onRequestHello logs!", {structuredData: true});
	response.send("onRequestHello response!");
});

export const onCallHello: any = functions.https.onCall(async (data: any, context: functions.https.CallableContext): Promise<string> => {
	functions.logger.info("onCallHello logs!", {structuredData: true});
	return "onCallHello response!";
});

export const api: functions.HttpsFunction = functions.https.onRequest(app);

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------



// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

//import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import app from "@server/App";
import onRequestHello from "@server/firebase/onRequestHello";
import onCallHello from "@server/firebase/onCallHello";

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

const api: functions.HttpsFunction = functions.https.onRequest(app);

export {
	api,
	onRequestHello,
	onCallHello,
};

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------


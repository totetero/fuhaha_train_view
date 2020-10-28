
// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

import * as firebase from "firebase/app";
import "firebase/functions";
import "firebase/firestore";
import config from "@config/index";

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

const app: firebase.app.App = firebase.initializeApp(config.firebaseWebAppConfig);

export const functions: firebase.functions.Functions = firebase.functions(app);
if (process.env.NODE_ENV === "development") { functions.useFunctionsEmulator("http://localhost:5001"); }

export const firestore: firebase.firestore.Firestore = firebase.firestore(app);
if (process.env.NODE_ENV === "development") { firestore.settings({ host: "localhost:8080", ssl: false, }); }

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------


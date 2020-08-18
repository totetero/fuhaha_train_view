
// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

import * as firebase from "firebase/app";
import "firebase/functions";
import firebaseConfig from "./firebaseConfig";

firebase.initializeApp(firebaseConfig);

export const functions: firebase.functions.Functions = firebase.functions();
if (process.env.NODE_ENV === "development") { functions.useFunctionsEmulator("http://localhost:5001"); }

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------


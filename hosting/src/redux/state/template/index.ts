
// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

import * as Redux from "redux";
import { ActionTypes, } from "@client/redux/ActionTypes";
import { State, } from "@client/redux/state/template/State";
import { reducerTest, createActionTest, } from "@client/redux/state/template/actionTest";

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

// Redux状態初期値
const initialState: State = {
	value: 0,
};

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

// 状態初期化と処理集積
const reducer: Redux.Reducer<State> = (state: State | undefined, action: Redux.Action<ActionTypes>): State => {
	if (state === undefined) { state = Object.assign({}, initialState); }
	state = reducerTest(state, action);
	return state;
};

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

export type StateTemplate = State;
export const stateTemplate = reducer;
export const stateTemplateCreateActionTest = createActionTest;

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------


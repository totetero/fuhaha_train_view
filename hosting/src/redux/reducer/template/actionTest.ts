
// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

import * as Redux from "redux";
import { ActionTypes, } from "@client/redux/ActionTypes";
import { State, } from "@client/redux/reducer/template/State";

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

// 命令構造体
interface ActionTest extends Redux.Action<ActionTypes> {
	value: number;
}

// ----------------------------------------------------------------

// 命令作成
export function createActionTest(value: number): ActionTest {
	return {
		type: ActionTypes.reducerTemplateTest,
		value: value,
	};
}

// ----------------------------------------------------------------

// 命令処理
export function reducerTest(state: State, action: Redux.Action<ActionTypes>): State {
	if (action.type !== ActionTypes.reducerTemplateTest) { return state; }
	const myAction: ActionTest = action as ActionTest;
	const newState: State = Object.assign({}, state);
	newState.value = newState.value + myAction.value;
	return newState;
};

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------


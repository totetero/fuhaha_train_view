
// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

import * as Redux from "redux";
import { ActionTypes, } from "@/client/redux/ActionTypes";

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

// Redux状態構造体
interface State {
	value: number;
}

// Redux状態初期値
const initialState: State = {
	value: 0,
};

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

// テスト命令構造体
interface ActionTest extends Redux.Action<ActionTypes> {
	value: number;
}

// ----------------------------------------------------------------

// テスト命令作成
function createActionTest(value: number): ActionTest {
	return {
		type: ActionTypes.reduxTemplateTest,
		value: value,
	};
}

// ----------------------------------------------------------------

// テスト命令処理
function reducerTest(state: State, action: Redux.Action<ActionTypes>): State {
	if (action.type !== ActionTypes.reduxTemplateTest) { return state; }
	const myAction: ActionTest = action as ActionTest;
	const newState: State = Object.assign({}, state);
	newState.value = newState.value + myAction.value;
	return newState;
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

export type ReduxTemplateState = State;
export const reduxTemplateCreateActionTest = createActionTest;
export const reduxTemplateReducer = reducer;

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------


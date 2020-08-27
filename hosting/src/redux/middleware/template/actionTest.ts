
// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

import * as Redux from "redux";
import { ActionTypes, } from "@client/redux/ActionTypes";
import { ReduxStoreState, } from "@client/redux/store";

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
		type: ActionTypes.middlewareTemplateTest,
		value: value,
	};
}

// ----------------------------------------------------------------

// 命令処理
type TypeArgument1 = Redux.Action<ActionTypes>;
type TypeArgument2 = Redux.Dispatch<TypeArgument1>;
type TypeArgument3 = Redux.MiddlewareAPI<Redux.Dispatch, ReduxStoreState>;
export function middlewareTest(api: TypeArgument3, next: TypeArgument2, action: TypeArgument1): boolean {
	if (action.type !== ActionTypes.middlewareTemplateTest) { return false; }
	return true;
};

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------


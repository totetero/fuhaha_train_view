
// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

import * as Redux from "redux";
import { ActionTypes, } from "@client/redux/ActionTypes";

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
export function middlewareTest(action: Redux.Action<ActionTypes>): boolean {
	if (action.type !== ActionTypes.middlewareTemplateTest) { return false; }
	return true;
};

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------


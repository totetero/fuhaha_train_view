
// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

import * as React from "react";
import { Link, } from "react-router-dom";
import * as ReactRedux from "react-redux";
import * as Redux from "redux";
import { ReduxStoreState, } from "@client/redux/store";
import { reducerTemplateCreateActionTest, } from "@client/redux/reducer/template";

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

const Component: React.FunctionComponent<{
	localValueInit: number;
}> = ({
	localValueInit = 10,
}): JSX.Element => {
	const dispatch: Redux.Dispatch = ReactRedux.useDispatch();

	// ステート設定 ストア値
	const storeValue: number = ReactRedux.useSelector((state: ReduxStoreState): number => state.stateTemplate.value);
	const setStoreValue: (value: number) => void = (value: number): void => { dispatch(reducerTemplateCreateActionTest(value)); };

	// ステート設定 ローカル値
	const [localValue, setLocalValue,]: [number, (localValue: number) => void,] = React.useState<number>(localValueInit);

	React.useEffect((): () => void => {
		console.log("mount");
		return (): void => {
			console.log("unmount");
		};
	}, []);

	return (
		<div>
			<div>
				<button onClick={ (): void => setStoreValue(1) }>add</button>
				<button onClick={ (): void => setStoreValue(-1) }>sub</button>
				<span>ストア値: { storeValue }</span>
			</div>
			<div>
				<button onClick={ (): void => setLocalValue(localValue + 1) }>add</button>
				<button onClick={ (): void => setLocalValue(localValue - 1) }>sub</button>
				<span>ローカル値: { localValue }</span>
			</div>
			<div><Link to='/top'>top</Link></div>
		</div>
	);
};

export default Component;

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------


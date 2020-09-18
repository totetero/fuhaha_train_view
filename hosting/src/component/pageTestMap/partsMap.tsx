
// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

import * as React from "react";
import config from "@config/index";

import Map from "@client/component/pageTestMap/Map";

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

// マップロード
const promiseMap: Promise<void> = new Promise((resolve: () => void): void => {
	window.initMap = resolve;
	const script: HTMLScriptElement = window.document.createElement("script");
	script.src = `https://maps.googleapis.com/maps/api/js?key=${config.googleMaps.apiKey}&callback=initMap`;
	window.document.head.appendChild(script);
});

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

const Component: React.FunctionComponent<{
	style?: React.CSSProperties;
}> = ({
	style = undefined,
}): JSX.Element => {
	// ステート設定 ローカル値
	const [localInitialized, setLocalInitialized,]: [boolean, (value: boolean) => void,] = React.useState<boolean>(false);
	const [localMap, setLocalMap,]: [Map | null, (value: Map | null) => void,] = React.useState<Map | null>(null);

	// マップ作成
	type TypeRefMap = (element: HTMLDivElement | null) => void;
	const refMap: TypeRefMap = React.useCallback<TypeRefMap>((element: HTMLDivElement | null): void => {
		if (!localInitialized) { return; }
		if (localMap !== null) { return; }
		if (element === null) { return; }
		const map: Map = new Map(element);
		setLocalMap(map);
	}, [localInitialized,]);

	// ライフサイクル
	React.useEffect((): () => void => {
		promiseMap.then((): void => setLocalInitialized(true));
		return (): void => {};
	}, []);

	return (
		<div ref={refMap} style={style}></div>
	);
};

export default Component;

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------


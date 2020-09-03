
// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

import * as React from "react";
import config from "@config";

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

// マップロード
const promiseMap: Promise<void> = new Promise((resolve: () => void): void => {
	window.initMap = resolve;
	const script: HTMLScriptElement = document.createElement("script");
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
	type TypeLocalMap = google.maps.Map | null;
	const [localInitialized, setLocalInitialized,]: [boolean, (value: boolean) => void,] = React.useState<boolean>(false);
	const [localMap, setLocalMap,]: [TypeLocalMap, (value: TypeLocalMap) => void,] = React.useState<TypeLocalMap>(null);
	console.log(localMap);

	// マップ作成
	type TypeRefMap = (element: HTMLDivElement | null) => void;
	const refMap: TypeRefMap = React.useCallback<TypeRefMap>((element: HTMLDivElement | null): void => {
		if (!localInitialized) { return; }
		if (element === null) { return; }
		const map: google.maps.Map = new google.maps.Map(element, {
			center: { lat: 35.717, lng: 139.731 },
			zoom: 8,
		});
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


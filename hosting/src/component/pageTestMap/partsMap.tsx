
// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

import * as React from "react";
import config from "@config/index";

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

// マップラッパクラス
class Map {
	constructor(element: Element) {
		const latLng: google.maps.LatLng = new google.maps.LatLng({ lat: 35.717, lng: 139.731 });

		const map: google.maps.Map = new google.maps.Map(element, {
			center: latLng,
			zoom: 8,
		});

		const marker: google.maps.Marker = new google.maps.Marker({
			position: latLng,
			map,
			title: "Hello World!"
		});
		marker.setMap(map);

		const line: google.maps.Polyline = new google.maps.Polyline({
			path: new google.maps.MVCArray<google.maps.LatLng>([latLng]),
			geodesic: true,
			strokeColor: "#FF0000",
			strokeOpacity: 1.0,
			strokeWeight: 2,
		});
		line.setMap(map);

		let info: google.maps.InfoWindow = new google.maps.InfoWindow({
			content: "Click the map to get Lat/Lng!",
			position: { lat: 35.717, lng: 139.731 },
		});
		info.open(map);

		map.addListener("click", (event: google.maps.MouseEvent): void => {
			const content: string = event.latLng.toString();
			const position: google.maps.LatLng = event.latLng;
			info.close();
			info = new google.maps.InfoWindow({ content, position, });
			info.open(map);
			line.getPath().push(position);
		});

		let index: number = 0;
		let count: number = 0;
		const max: number = 300;
		const mainloop: () => void = (): void => {
			const path: google.maps.MVCArray<google.maps.LatLng> = line.getPath();
			if (index < path.getLength() - 1) {
				// 移動元の極座標を直交座標に変換
				const latLng0: google.maps.LatLng = path.getAt(index + 0);
				const cosLat0: number = Math.cos(latLng0.lat() * Math.PI / 180);
				const sinLat0: number = Math.sin(latLng0.lat() * Math.PI / 180);
				const cosLng0: number = Math.cos(latLng0.lng() * Math.PI / 180);
				const sinLng0: number = Math.sin(latLng0.lng() * Math.PI / 180);
				const x0: number = cosLat0 * cosLng0;
				const y0: number = sinLat0;
				const z0: number = cosLat0 * sinLng0;

				// 移動先の極座標を直交座標に変換
				const latLng1: google.maps.LatLng = path.getAt(index + 1);
				const cosLat1: number = Math.cos(latLng1.lat() * Math.PI / 180);
				const sinLat1: number = Math.sin(latLng1.lat() * Math.PI / 180);
				const cosLng1: number = Math.cos(latLng1.lng() * Math.PI / 180);
				const sinLng1: number = Math.sin(latLng1.lng() * Math.PI / 180);
				const x1: number = cosLat1 * cosLng1;
				const y1: number = sinLat1;
				const z1: number = cosLat1 * sinLng1;

				// 球面線形補完
				const dot: number = x0 * x1 + y0 * y1 + z0 * z1;
				const angle: number = Math.acos(dot);
				const sin0: number = Math.sin(angle * (1 - count / max));
				const sin1: number = Math.sin(angle * count / max);
				const sin2: number = Math.sin(angle);
				const x2: number = (x0 * sin0 + x1 * sin1) / sin2;
				const y2: number = (y0 * sin0 + y1 * sin1) / sin2;
				const z2: number = (z0 * sin0 + z1 * sin1) / sin2;

				// 直交座標を極座標に変換
				const lat: number = Math.asin(y2) * 180 / Math.PI;
				const lng: number = Math.atan2(z2, x2) * 180 / Math.PI;
				marker.setPosition({ lat, lng });

				count++;
				if (count >= max) { index++; }
				if (count >= max) { count = 0; }
				if (index >= path.getLength()) { index = 0; }
			}
			window.requestAnimationFrame(mainloop);
		};
		mainloop();
	}
}

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
	console.log(localMap);

	// マップ作成
	type TypeRefMap = (element: HTMLDivElement | null) => void;
	const refMap: TypeRefMap = React.useCallback<TypeRefMap>((element: HTMLDivElement | null): void => {
		if (!localInitialized) { return; }
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


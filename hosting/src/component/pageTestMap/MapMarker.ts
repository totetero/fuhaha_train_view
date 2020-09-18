
// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

import MapMarkerIcon from "@client/component/pageTestMap/MapMarkerIcon";

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

export default class MapMarker {
	private marker: google.maps.Marker | null = null;
	private icon: MapMarkerIcon | null = null;
	private index: number = -1;

	constructor(options: {
		map: google.maps.Map;
		position: google.maps.LatLng;
	}) {
		this.marker = new google.maps.Marker(options);
		this.icon = new MapMarkerIcon();
	}

	// 地球を完全な球であると仮定して、二つの緯度経度から球面線形補間した緯度経度を厳密に求める
	public calcStrict(latLng0: google.maps.LatLng, latLng1: google.maps.LatLng, parameter: number): void {
		if (this.marker === null) { return; }

		// 移動元の極座標を直交座標に変換
		const cosLat0: number = Math.cos(latLng0.lat() * Math.PI / 180);
		const sinLat0: number = Math.sin(latLng0.lat() * Math.PI / 180);
		const cosLng0: number = Math.cos(latLng0.lng() * Math.PI / 180);
		const sinLng0: number = Math.sin(latLng0.lng() * Math.PI / 180);
		const x0: number = cosLat0 * cosLng0;
		const y0: number = sinLat0;
		const z0: number = cosLat0 * sinLng0;

		// 移動先の極座標を直交座標に変換
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
		const sin0: number = Math.sin(angle * (1 - parameter));
		const sin1: number = Math.sin(angle * parameter);
		const sin2: number = Math.sin(angle);
		const x2: number = (x0 * sin0 + x1 * sin1) / sin2;
		const y2: number = (y0 * sin0 + y1 * sin1) / sin2;
		const z2: number = (z0 * sin0 + z1 * sin1) / sin2;

		// 直交座標を極座標に変換
		const lat: number = Math.asin(y2) * 180 / Math.PI;
		const lng: number = Math.atan2(z2, x2) * 180 / Math.PI;
		this.marker.setPosition({ lat, lng });
	}

	// 二つの緯度経度から緯度経度角度の近似値を求める 距離が長かったり日付変更線を跨いだりすると死ぬ
	public calc(latLng0: google.maps.LatLng, latLng1: google.maps.LatLng, parameter: number): void {
		if (this.marker === null) { return; }
		if (this.icon === null) { return; }

		const dLat: number = latLng1.lat() - latLng0.lat();
		const dLng: number = latLng1.lng() - latLng0.lng();

		// 線形補間した緯度経度を求める
		const lat: number = latLng0.lat() + dLat * parameter;
		const lng: number = latLng0.lng() + dLng * parameter;
		this.marker.setPosition({ lat, lng });

		// 角度を求める
		const angle: number = Math.atan2(dLat, dLng);
		const index: number = this.icon.getIndex(angle);
		if (this.index !== index) {
			this.index = index;
			this.marker.setIcon({
				url: this.icon.getURL(index),
				anchor: this.icon.getAnchor(),
			});
		}
	}
}

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------


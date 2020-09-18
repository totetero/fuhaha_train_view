
// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

import MapMarker from "@client/component/pageTestMap/MapMarker";

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

export default class Map {
	private map: google.maps.Map | null = null;

	constructor(element: Element) {
		const latLng: google.maps.LatLng = new google.maps.LatLng({ lat: 35.717, lng: 139.731 });

		this.map = new google.maps.Map(element, {
			center: latLng,
			zoom: 8,
		});

		const marker: MapMarker = new MapMarker({
			map: this.map,
			position: latLng,
		});

		const line: google.maps.Polyline = new google.maps.Polyline({
			map: this.map,
			path: new google.maps.MVCArray<google.maps.LatLng>([latLng]),
			geodesic: true,
			strokeColor: "#FF0000",
			strokeOpacity: 1.0,
			strokeWeight: 2,
		});

		let info: google.maps.InfoWindow = new google.maps.InfoWindow({
			content: "Click the map to get Lat/Lng!",
			position: { lat: 35.717, lng: 139.731 },
		});
		info.open(this.map);

		this.map.addListener("click", (event: google.maps.MouseEvent): void => {
			if (this.map === null) { return; }
			const content: string = event.latLng.toString();
			const position: google.maps.LatLng = event.latLng;
			info.close();
			info = new google.maps.InfoWindow({ content, position, });
			info.open(this.map);
			line.getPath().push(position);
		});

		let index: number = 0;
		let count: number = 0;
		const max: number = 300;
		const mainloop: () => void = (): void => {
			const path: google.maps.MVCArray<google.maps.LatLng> = line.getPath();
			if (index < path.getLength() - 1) {
				const latLng0: google.maps.LatLng = path.getAt(index + 0);
				const latLng1: google.maps.LatLng = path.getAt(index + 1);
				const parameter: number = count / max;
				marker.calc(latLng0, latLng1, parameter);

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


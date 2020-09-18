
// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

import { mat4, } from "gl-matrix";
import MapMarkerIconShader from "@client/component/pageTestMap/MapMarkerIconShader";
import MapMarkerIconTrainTest from "@client/component/pageTestMap/MapMarkerIconTrainTest";

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

export default class MapMarkerIcon {
	private static readonly count: number = 32;
	private static canvas: HTMLCanvasElement | null = null;
	private static gl: WebGLRenderingContext | null = null;
	private static shader: MapMarkerIconShader = new MapMarkerIconShader();
	private static trainTest: MapMarkerIconTrainTest = new MapMarkerIconTrainTest();
	private static urlList: string[] | null = null;
	private angle: number | null = null;

	constructor() {
		if (MapMarkerIcon.canvas === null || MapMarkerIcon.gl === null) {
			MapMarkerIcon.canvas = window.document.createElement("canvas");
			MapMarkerIcon.canvas.width = 100;
			MapMarkerIcon.canvas.height = 100;
			MapMarkerIcon.gl = MapMarkerIcon.canvas.getContext("webgl")!;
			MapMarkerIcon.gl.clearColor(0.0, 0.0, 0.0, 0.0);
			MapMarkerIcon.gl.clearDepth(1.0);
			MapMarkerIcon.gl.cullFace(MapMarkerIcon.gl.BACK);
			MapMarkerIcon.gl.enable(MapMarkerIcon.gl.TEXTURE_2D);
			MapMarkerIcon.gl.enable(MapMarkerIcon.gl.DEPTH_TEST);
			MapMarkerIcon.gl.enable(MapMarkerIcon.gl.CULL_FACE);
			MapMarkerIcon.gl.activeTexture(MapMarkerIcon.gl.TEXTURE0);
			MapMarkerIcon.shader.init(MapMarkerIcon.gl);
			MapMarkerIcon.trainTest.init(MapMarkerIcon.gl);
		}

		if (MapMarkerIcon.urlList === null) {
			Promise.all(Array(MapMarkerIcon.count).fill(0).map(async (_: undefined, index: number): Promise<string> => {
				return await new Promise((resolve: (blob: Blob | null) => void): void => {
					if (MapMarkerIcon.canvas === null) { throw new Error("null canvas"); }
					this.draw(2 * Math.PI * index / MapMarkerIcon.count);
					MapMarkerIcon.canvas.toBlob(resolve);
				}).then((blob: Blob | null): string => URL.createObjectURL(blob));
			})).then((urlList: string[]): void => {
				MapMarkerIcon.urlList = urlList;
			});
		}
	}

	private draw(angle: number): void {
		if (MapMarkerIcon.canvas === null) { throw new Error("null canvas"); }
		if (MapMarkerIcon.gl === null) { throw new Error("null context"); }
		MapMarkerIcon.gl.clear(MapMarkerIcon.gl.COLOR_BUFFER_BIT | MapMarkerIcon.gl.DEPTH_BUFFER_BIT);
		MapMarkerIcon.shader.use(MapMarkerIcon.gl);

		const m1: mat4 = mat4.create();
		const m2: mat4 = mat4.create();
		const cr: number = 10;
		const cy: number = cr * Math.cos(Math.PI / 4);
		const cz: number = cr * Math.sin(Math.PI / 4);
		mat4.perspective(m1, Math.PI / 6, MapMarkerIcon.canvas.width / MapMarkerIcon.canvas.height, 1.0, 1000.0);
		mat4.lookAt(m2, [0, cy, cz], [0, 0, 0], [0, 1, 0]);
		mat4.multiply(m1, m1, m2);
		mat4.rotateY(m1, m1, angle + Math.PI / 2);

		const attrPos: number = MapMarkerIcon.shader.getAttrPos();
		const attrUvc: number = MapMarkerIcon.shader.getAttrUvc();
		const unifMat: WebGLUniformLocation | null = MapMarkerIcon.shader.getUnifMat();
		const unifCol: WebGLUniformLocation | null = MapMarkerIcon.shader.getUnifCol();
		const unifTex: WebGLUniformLocation | null = MapMarkerIcon.shader.getUnifTex();
		MapMarkerIcon.gl.uniformMatrix4fv(unifMat, false, m1);
		MapMarkerIcon.gl.uniform4fv(unifCol, [1.0, 1.0, 1.0, 1.0,]);
		MapMarkerIcon.trainTest.draw(MapMarkerIcon.gl, attrPos, attrUvc, unifTex);

		MapMarkerIcon.gl.flush();
	}

	public getIndex(angle: number): number {
		this.angle = (this.angle === null) ? angle : ((): number => {
			let dAngle: number = angle - this.angle;
			while(dAngle > Math.PI) { dAngle -= 2 * Math.PI; }
			while(dAngle < -Math.PI) { dAngle += 2 * Math.PI; }
			return this.angle + dAngle * 0.1;
		})();

		let index: number = Math.round(this.angle * MapMarkerIcon.count / (2 * Math.PI));
		while (index < 0) { index += MapMarkerIcon.count; }
		while (index >= MapMarkerIcon.count) { index -= MapMarkerIcon.count; }

		return index;
	}

	public getURL(index: number): string {
		return (MapMarkerIcon.urlList === null) ? "" : MapMarkerIcon.urlList[index];
	}

	public getAnchor(): google.maps.Point {
		if (MapMarkerIcon.canvas === null) { throw new Error("null canvas"); }
		const cx: number = MapMarkerIcon.canvas.width / 2;
		const cy: number = MapMarkerIcon.canvas.height / 2;
		return new google.maps.Point(cx, cy);
	}
}

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------


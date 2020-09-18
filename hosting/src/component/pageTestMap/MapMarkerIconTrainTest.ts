
// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

export default class MapMarkerIconSphere {
	private vertBuffer: WebGLBuffer | null = null;
	private texcBuffer: WebGLBuffer | null = null;
	private faceBuffer: WebGLBuffer | null = null;
	private texture: WebGLTexture | null = null;
	private count: number = 0;

	// 初期化
	public init(gl: WebGLRenderingContext): void {
		// 頂点配列作成
		const vert: number[] = [
			-0.5, 1.0,  1.0, // 前
			-0.5, 0.0,  1.0,
			 0.5, 0.0,  1.0,
			 0.5, 1.0,  1.0,

			 0.5, 1.0, -1.0, // 後
			 0.5, 0.0, -1.0,
			-0.5, 0.0, -1.0,
			-0.5, 1.0, -1.0,

			-0.5, 1.0, -1.0, // 上
			-0.5, 1.0,  1.0,
			 0.5, 1.0,  1.0,
			 0.5, 1.0, -1.0,

			-0.5, 1.0, -1.0, // 左
			-0.5, 0.0, -1.0,
			-0.5, 0.0,  1.0,
			-0.5, 1.0,  1.0,

			 0.5, 1.0,  1.0, // 右
			 0.5, 0.0,  1.0,
			 0.5, 0.0, -1.0,
			 0.5, 1.0, -1.0,
		];

		// テクスチャ座標配列作成
		const texc: number[] = [
			0.00, 0.0, // 前
			0.00, 0.5,
			0.25, 0.5,
			0.25, 0.0,

			0.25, 0.0, // 後
			0.25, 0.5,
			0.50, 0.5,
			0.50, 0.0,

			0.50, 0.0, // 上
			0.50, 0.5,
			1.00, 0.5,
			1.00, 0.0,

			0.00, 0.5, // 左
			0.00, 1.0,
			0.50, 1.0,
			0.50, 0.5,

			0.50, 0.5, // 右
			0.50, 1.0,
			1.00, 1.0,
			1.00, 0.5,
		];

		// 頂点インデックス配列作成
		const face: number[] = [
			 0,  1,  2,  2,  3,  0,
			 4,  5,  6,  6,  7,  4,
			 8,  9, 10, 10, 11,  8,
			12, 13, 14, 14, 15, 12,
			16, 17, 18, 18, 19, 16,
		];

		// バッファ作成
		this.vertBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.vertBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vert), gl.STATIC_DRAW);
		this.texcBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.texcBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texc), gl.STATIC_DRAW);
		this.faceBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.faceBuffer);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Int16Array(face), gl.STATIC_DRAW);
		this.count = face.length;

		// テクスチャ作成
		const canvas: HTMLCanvasElement = document.createElement("canvas");
		canvas.width = 128;
		canvas.height = 64;
		const context: CanvasRenderingContext2D | null = canvas.getContext("2d");
		if (context === null) { throw new Error("context"); }
		context.fillStyle = "yellow";
		context.fillRect(0, 0, canvas.width, canvas.height);
		context.fillStyle = "red";
		context.fillRect(6, 6, 20, 20);
		context.fillStyle = "pink";
		context.fillRect(32 + 6, 6, 20, 20);
		context.fillStyle = "black";
		context.fillRect(64 + 6, 6, 20 + 32, 20);
		context.fillStyle = "blue";
		context.fillRect(6, 32 + 6, 20 + 32, 20);
		context.fillStyle = "green";
		context.fillRect(64 + 6, 32 + 6, 20 + 32, 20);
		this.texture = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D, this.texture);
  		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, canvas);
		gl.generateMipmap(gl.TEXTURE_2D);

		// テクスチャの目視確認
		document.body.appendChild(canvas);
	}

	// 描画
	public draw(gl: WebGLRenderingContext, attrPos: number, attrUvc: number, unifTex: WebGLUniformLocation | null): void {
		// 頂点配列適用
		gl.bindBuffer(gl.ARRAY_BUFFER, this.vertBuffer);
		gl.vertexAttribPointer(attrPos, 3, gl.FLOAT, false, 0, 0);
		// テクスチャ座標適用
		gl.bindBuffer(gl.ARRAY_BUFFER, this.texcBuffer);
		gl.vertexAttribPointer(attrUvc, 2, gl.FLOAT, false, 0, 0);
		// 頂点インデックス配列適用
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.faceBuffer);
		// テクスチャ適用
		gl.bindTexture(gl.TEXTURE_2D, this.texture);
		gl.uniform1i(unifTex, 0);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
		// 描画
		const offset = 0;
		const count = this.count;
		gl.drawElements(gl.TRIANGLES, count, gl.UNSIGNED_SHORT, offset * Uint16Array.BYTES_PER_ELEMENT);
	}

	// 破棄
	public dispose(gl: WebGLRenderingContext): void {
		gl.deleteBuffer(this.vertBuffer);
		gl.deleteBuffer(this.texcBuffer);
		gl.deleteBuffer(this.faceBuffer);
		this.vertBuffer = null;
		this.faceBuffer = null;
		this.count = 0;
	}
}

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------


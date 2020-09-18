
// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

export default class MapMarkerIconShader {
	private program: WebGLProgram | null = null;
	private attrPos: number = -1;
	private attrUvc: number = -1;
	private unifMat: WebGLUniformLocation | null = null;
	private unifCol: WebGLUniformLocation | null = null;
	private unifTex: WebGLUniformLocation | null = null;

	// 初期化
	public init(gl: WebGLRenderingContext): void {
		const program: WebGLProgram | null = gl.createProgram();
		const vshader: WebGLShader | null = gl.createShader(gl.VERTEX_SHADER);
		const fshader: WebGLShader | null = gl.createShader(gl.FRAGMENT_SHADER);
		if (!program) { throw new Error("program"); }
		if (!vshader) { throw new Error("vshader"); }
		if (!fshader) { throw new Error("fshader"); }
		gl.shaderSource(vshader, vsource);
		gl.shaderSource(fshader, fsource);
		gl.compileShader(vshader);
		gl.compileShader(fshader);
		if (!gl.getShaderParameter(vshader, gl.COMPILE_STATUS)) { throw gl.getShaderInfoLog(vshader); }
		if (!gl.getShaderParameter(fshader, gl.COMPILE_STATUS)) { throw gl.getShaderInfoLog(fshader); }
		gl.attachShader(program, vshader);
		gl.attachShader(program, fshader);
		gl.linkProgram(program);
		this.program = program;
		this.attrPos = gl.getAttribLocation(program, "vs_attr_pos");
		this.attrUvc = gl.getAttribLocation(program, "vs_attr_uvc");
		this.unifMat = gl.getUniformLocation(program, "vs_unif_mat");
		this.unifCol = gl.getUniformLocation(program, "fs_unif_col");
		this.unifTex = gl.getUniformLocation(program, "fs_unif_tex");
	}

	// 使用
	public use(gl: WebGLRenderingContext): void {
		gl.useProgram(this.program);
		gl.enableVertexAttribArray(this.attrPos);
		gl.enableVertexAttribArray(this.attrUvc);
	}

	// 取得
	public getAttrPos(): number { return this.attrPos; }
	public getAttrUvc(): number { return this.attrUvc; }
	public getUnifMat(): WebGLUniformLocation | null { return this.unifMat; }
	public getUnifCol(): WebGLUniformLocation | null { return this.unifCol; }
	public getUnifTex(): WebGLUniformLocation | null { return this.unifTex; }

	// 破棄
	public dispose(gl: WebGLRenderingContext): void {
		gl.deleteProgram(this.program);
		this.program = null;
		this.attrPos = -1;
		this.attrUvc = -1;
		this.unifMat = null;
		this.unifCol = null;
		this.unifTex = null;
	}
}

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

// 頂点シェーダー
const vsource: string = `
	precision highp float;
	attribute vec3 vs_attr_pos;
	attribute vec2 vs_attr_uvc;
	uniform mat4 vs_unif_mat;
	varying vec2 tex_coord;
	void main() {
		tex_coord = vs_attr_uvc;
		gl_Position = vs_unif_mat * vec4(vs_attr_pos, 1.0);
	}
`;

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

// フラグメントシェーダー
const fsource: string = `
	precision highp float;
	uniform vec4 fs_unif_col;
	uniform sampler2D fs_unif_tex;
	varying vec2 tex_coord;
	void main() {
		gl_FragColor = texture2D(fs_unif_tex, tex_coord) * fs_unif_col;
	}
`;

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------


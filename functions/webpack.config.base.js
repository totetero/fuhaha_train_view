const path = require("path");
const nodeExternals = require("webpack-node-externals");

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

module.exports = {
	target: "node",
	externals: [nodeExternals(),],
	entry: path.resolve(__dirname, "./src/Main.ts"),
	output: {
		path: path.resolve(__dirname, "./"),
		publicPath: "/",
		filename: "index.js",
		libraryTarget: 'commonjs',
	},
	resolve: {
		extensions: [".js", ".ts",],
		alias: { "@server": path.resolve(__dirname, "./src"), },
	},
	module: {
		rules: [{
			test: /\.ts$/,
			loader: "ts-loader",
		},],
	},
};

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

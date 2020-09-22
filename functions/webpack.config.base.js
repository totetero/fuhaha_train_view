
// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

const path = require("path");
const nodeExternals = require("webpack-node-externals");
const HardSourceWebpackPlugin = require("hard-source-webpack-plugin");

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
		libraryTarget: "commonjs",
	},
	resolve: {
		extensions: [".js", ".ts",],
		alias: {
			"@server": path.resolve(__dirname, "./src"),
			"@client": path.resolve(__dirname, "../hosting/src"),
			"@config": path.resolve(__dirname, "../config"),
		},
	},
	module: {
		rules: [{
			test: /\.ts$/,
			loader: "ts-loader",
		},],
	},
	plugins: [
		new HardSourceWebpackPlugin(),
	],
};

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------


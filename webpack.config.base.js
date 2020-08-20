const path = require("path");
const nodeExternals = require("webpack-node-externals");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

const client = {
	entry: path.resolve(__dirname, "./src/client/Main.ts"),
	output: {
		path: path.resolve(__dirname, "./public"),
		publicPath: "/",
		filename: "index.js?[hash]",
	},
	resolve: {
		extensions: [".js", ".ts", ".tsx",],
		alias: { "@": path.resolve(__dirname, "src"), },
	},
	module: {
		rules: [{
			test: /\.(ts|tsx)$/,
			loader: "ts-loader",
			options: {
				configFile: "tsconfig.client.json",
			},
		},],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(__dirname, "src/client/index.html"),
		}),
		new CopyWebpackPlugin([
			{ from: 'src/client/test.txt' },
		]),
	],
};

const server = {
	target: "node",
	externals: [nodeExternals(),],
	entry: path.resolve(__dirname, "./src/server/Main.ts"),
	output: {
		path: path.resolve(__dirname, "./functions"),
		publicPath: "/",
		filename: "index.js",
		libraryTarget: 'commonjs',
	},
	resolve: {
		extensions: [".js", ".ts",],
		alias: { "@": path.resolve(__dirname, "src"), },
	},
	module: {
		rules: [{
			test: /\.ts$/,
			loader: "ts-loader",
			options: {
				configFile: "tsconfig.server.json",
			},
		},],
	},
};


module.exports = [client, server,];

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

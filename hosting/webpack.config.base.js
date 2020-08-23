const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

module.exports = {
	entry: path.resolve(__dirname, "./src/Main.ts"),
	output: {
		path: path.resolve(__dirname, "../public"),
		publicPath: "/",
		filename: "index.js?[hash]",
	},
	resolve: {
		extensions: [".js", ".ts", ".tsx",],
		alias: { "@client": path.resolve(__dirname, "./src"), },
	},
	module: {
		rules: [{
			test: /\.(ts|tsx)$/,
			loader: "ts-loader",
		},],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(__dirname, "./src/index.html"),
		}),
	],
};

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

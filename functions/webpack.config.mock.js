
// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

const path = require("path");
const { merge, } = require("webpack-merge");
const base = require("./webpack.config.base.js");

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

module.exports = merge(base, {
	mode: "development",
	entry: path.resolve(__dirname, "./src/Mock.ts"),
	output: {
		path: path.resolve(__dirname, "./"),
		publicPath: "/",
		filename: "mock.js",
		libraryTarget: "commonjs",
	},
	resolve: {
		alias: {
			"@config": path.resolve(__dirname, "../config/mock"),
		},
	},
});

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------


// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

import * as React from "react";
import {
	BrowserRouter,
	HashRouter,
} from "react-router-dom";
import config from "@config/index";

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

const Component: React.FunctionComponent<{}> = ({
	children,
}): JSX.Element => {
	const isHash: boolean = config.apollo.url.startsWith("/");
	return !isHash ? (
		<BrowserRouter>{children}</BrowserRouter>
	) : (
		<HashRouter>{children}</HashRouter>
	);
};

export default Component;

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------


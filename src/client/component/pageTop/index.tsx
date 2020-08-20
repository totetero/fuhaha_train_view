
// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

import * as React from "react";
import { Link, } from "react-router-dom";

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

const Component: React.FunctionComponent<{}> = ({}): JSX.Element => {
	return (
		<div style={{
			display: "flex",
			flexDirection: "column",
			justifyContent: "center",
			alignItems: "center",
			position: "absolute",
			left: 0,
			right: 0,
			top: 0,
			bottom: 0,
		}}>
			<div style={{
				flexGrow: 1,
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
			}}>
				<div>fuhaha train view</div>
			</div>
			<div style={{
				display: "flex",
				justifyContent: "space-around",
				alignItems: "center",
				width: "100%",
				height: "100px",
			}}>
				<Link to="/test">test</Link>
				<Link to="/template">template</Link>
			</div>
		</div>
	);
};

export default Component;

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------


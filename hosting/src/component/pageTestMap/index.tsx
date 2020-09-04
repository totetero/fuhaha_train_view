
// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

import * as React from "react";
import PartsMap from "@client/component/pageTestMap/partsMap";

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
			<PartsMap style={{
				width: "300px",
				height: "300px",
			}}></PartsMap>
		</div>
	);
};

export default Component;

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

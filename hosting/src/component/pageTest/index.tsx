
// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

import * as React from "react";
import { DocumentNode, } from "graphql";
import { gql, } from "apollo-boost";
import { QueryResult, } from "@apollo/react-common";
import { useQuery, } from "@apollo/react-hooks";
import callFunction from "@client/firebase/functionOnCallHello";

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

const query: DocumentNode = gql`{
	hello
}`;

const Component: React.FunctionComponent<{}> = ({}): JSX.Element => {
	const result: QueryResult<{
		hello: string;
	}> = useQuery(query);

	return result.loading ? (
		<div>
			<div>loading</div>
		</div>
	) : result.error ? (
		<div>
			<div>{ result.error.toString() }</div>
		</div>
	) : (
		<div>
			<div>apollo</div>
			<div>{ result.data?.hello }</div>
			<button onClick={(): void => { callFunction({}).then((response: string): void => console.log(response)); }}>hello</button>
		</div>
	);
};

export default Component;

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------


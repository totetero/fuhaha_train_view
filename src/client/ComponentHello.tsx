
// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

import * as React from "react";
import { DocumentNode, } from "graphql";
import { gql, } from "apollo-boost";
import { QueryResult, } from "@apollo/react-common";
import { useQuery, } from "@apollo/react-hooks";

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
		</div>
	);
};

export default Component;

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------


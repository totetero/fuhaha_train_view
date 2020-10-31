
// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

import * as React from "react";
import { DocumentNode, } from "graphql";
import { gql, } from "apollo-boost";
import { QueryResult, } from "@apollo/react-common";
import { useQuery, } from "@apollo/react-hooks";
import { firestore, } from "@client/firebase/settings";
import callFunction from "@client/firebase/functionOnCallHello";
import config from "@config/index";

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
			<div>{result.error.toString()}</div>
		</div>
	) : (
		<div>
			<div>apollo</div>
			<div>{result.data?.hello}</div>

			<button style={{
				width: "100px",
				height: "60px",
				margin:"10px",
			}} onClick={(): void => {
				callFunction({}).then((response: string): void => console.log(response));
			}}>hello</button>

			<button style={{
				width: "100px",
				height: "60px",
				margin:"10px",
			}} onClick={(): void => {
				window.fetch(`${config.api.url}/test`, {
					method: "POST",
					headers: { "Content-Type": "application/json", },
					body: JSON.stringify({
						hoge: "myon",
					}),
				});
			}}>srv db</button>

			<button style={{
				width: "100px",
				height: "60px",
				margin:"10px",
			}} onClick={async (): Promise<void> => {
				await firestore.collection("users").doc("test").set({
					aaa: "hoge",
					bbb: "fuga",
				});

				const snapshot = await firestore.collection("users").get();
				snapshot.forEach((doc) => console.log("firestore", doc.id, '=>', doc.data()));
			}}>cli db</button>

			<button style={{
				width: "100px",
				height: "60px",
				margin:"10px",
			}} onClick={(): void => {
				window.fetch("http://localhost:8080/emulator/v1/projects/fuhaha-train-view/databases/(default)/documents", {
					method: "DELETE",
				});
			}}>clear</button>
		</div>
	);
};

export default Component;

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------


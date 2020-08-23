
// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

import * as React from "react";
import {
	BrowserRouter,
	Switch,
	Route,
} from "react-router-dom";
import * as ReactRedux from "react-redux";
import { store, } from "@/redux/Store";
import { ApolloProvider, } from "@apollo/react-hooks";
import { apolloClient, } from "@/component/main/apolloClient";
import ComponentTemplate from "@/component/template";
import ComponentPageTop from "@/component/pageTop";
import ComponentPageTest from "@/component/pageTest";

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

const Component: React.FunctionComponent<{}> = ({}): JSX.Element => {
	return (
		<ApolloProvider client={apolloClient}>
			<ReactRedux.Provider store = { store }>
				<BrowserRouter>
					<Switch>
						<Route path="/test" component={ ComponentPageTest } />
						<Route path="/template" component={ ComponentTemplate } />
						<Route component={ ComponentPageTop } />
					</Switch>
				</BrowserRouter>
			</ReactRedux.Provider>
		</ApolloProvider>
	);
};

export default Component;

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------


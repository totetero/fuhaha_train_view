
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
import { store, } from "@client/redux/store";
import { ApolloProvider, } from "@apollo/react-hooks";
import { apolloClient, } from "@client/component/main/apolloClient";
import ComponentTemplate from "@client/component/template";
import ComponentPageTop from "@client/component/pageTop";
import ComponentPageTest from "@client/component/pageTest";
import ComponentPageTestMap from "@client/component/pageTestMap";

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
						<Route path="/test_map" component={ ComponentPageTestMap } />
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


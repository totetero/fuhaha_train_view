
// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

import { ApolloClient, } from "apollo-client";
import { InMemoryCache, } from "apollo-cache-inmemory";
import { HttpLink, } from "apollo-link-http";

export const apolloClient = new ApolloClient({
	cache: new InMemoryCache(),
	link: new HttpLink({
		uri: ((): string => {
			if (process.env.NODE_ENV === "development") { return "http://localhost:5001/fuhaha-train-view/us-central1/api/graphql"; }
			if (process.env.NODE_ENV === "production") { return "https://us-central1-fuhaha-train-view.cloudfunctions.net/api/graphql"; }
			return "";
		})(),
	}),
});

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------


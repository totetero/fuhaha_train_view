
// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

import { ApolloClient, } from "apollo-client";
import { InMemoryCache, } from "apollo-cache-inmemory";
import { HttpLink, } from "apollo-link-http";
import config from "@config";

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

export const apolloClient = new ApolloClient({
	cache: new InMemoryCache(),
	link: new HttpLink({ uri: config.apollo.url, }),
});

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------


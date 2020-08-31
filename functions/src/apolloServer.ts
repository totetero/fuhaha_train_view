
// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

import * as express from "express";
import { DocumentNode, } from "graphql";
import { IResolvers, } from "graphql-tools";
import { ApolloServer, gql, } from "apollo-server-express";

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

const typeDefs: DocumentNode = gql`
	type Query {
		hello: String
	}
`;

const resolvers: IResolvers = {
	Query: {
		hello: () => "Hello world!",
	},
};

const server: ApolloServer = new ApolloServer({ typeDefs: typeDefs, resolvers: resolvers, });
export const apolloServer: express.Router = server.getMiddleware({ path: "/graphql", });

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------


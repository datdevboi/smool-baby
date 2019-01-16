import { ApolloServer, gql } from "apollo-server";
import { genSchema } from "./utils/genSchema";
import { ServerResReq } from "./types";

const { typeDefs, resolvers } = genSchema();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }: ServerResReq) => ({
    req,
    res
  })
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

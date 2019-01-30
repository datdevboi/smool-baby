import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

const host = "http://10.0.0.87:4000/graphql";

export const client = new ApolloClient({
  link: new HttpLink({
    uri: host,
    credentials: "include"
  }),
  cache: new InMemoryCache()
});

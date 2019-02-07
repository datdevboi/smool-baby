import { ApolloClient } from "apollo-client";
import { withClientState } from "apollo-link-state";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createUploadLink } from "apollo-upload-client";
import { resolvers, defaults } from "./resolvers";
import { ApolloLink } from "apollo-link";

export const host = "http://10.0.0.87:4000";
const cache = new InMemoryCache();

const stateLink = withClientState({
  cache,
  resolvers,
  defaults
});

export const client = new ApolloClient({
  link: ApolloLink.from([
    stateLink,
    createUploadLink({
      uri: `${host}/graphql`,
      credentials: "include"
    })
  ]),
  cache
});

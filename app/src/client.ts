import { ApolloClient } from "apollo-client";

import { InMemoryCache } from "apollo-cache-inmemory";
import { createUploadLink } from "apollo-upload-client";

export const host = "http://10.0.0.87:4000";

export const client = new ApolloClient({
  link: createUploadLink({
    uri: `${host}/graphql`,
    credentials: "include"
  }),
  cache: new InMemoryCache()
});

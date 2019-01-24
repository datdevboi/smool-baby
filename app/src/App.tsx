import * as React from "react";

import { ApolloProvider } from "react-apollo";
import { client } from "./client";
import { MainApp } from "./navigation";

export class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <MainApp />
      </ApolloProvider>
    );
  }
}

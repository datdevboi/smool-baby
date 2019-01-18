import * as React from "react";
import { Text } from "react-native";
import { ApolloProvider } from "react-apollo";
import { client } from "./client";

export class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Text>Hello</Text>
      </ApolloProvider>
    );
  }
}

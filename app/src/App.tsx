import * as React from "react";
import { Text } from "react-native";
import { ApolloProvider } from "react-apollo";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { client } from "./client";
import { Login } from "./modules/login/";
import { Register } from "./modules/register";

const AppSwitchNavigator = createSwitchNavigator({
  Login: {
    screen: Login
  },
  Register: {
    screen: Register
  }
});

const MainScreen = createAppContainer(AppSwitchNavigator);

export class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <MainScreen />
      </ApolloProvider>
    );
  }
}

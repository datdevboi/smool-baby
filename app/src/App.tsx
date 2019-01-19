import * as React from "react";
import { Text } from "react-native";
import { ApolloProvider } from "react-apollo";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { client } from "./client";
import { Login } from "./modules/login/";
import { Register } from "./modules/register";
import { DashBoard } from "./modules/dashboard";

const AppSwitchNavigator = createSwitchNavigator({
  Login: {
    screen: Login
  },
  Register: {
    screen: Register
  },
  Dashboard: {
    screen: DashBoard
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

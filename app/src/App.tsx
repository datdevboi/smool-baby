import * as React from "react";

import { ApolloProvider } from "react-apollo";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { client } from "./client";
import { Login } from "./modules/login/";
import { Register } from "./modules/register";
import { DashBoard } from "./modules/dashboard";
import { AuthLoadingScreen } from "./modules/auth";

const AppSwitchNavigator = createSwitchNavigator(
  {
    Login: {
      screen: Login
    },
    Register: {
      screen: Register
    },
    Auth: {
      screen: AuthLoadingScreen
    },
    Dashboard: {
      screen: DashBoard
    }
  },
  {
    initialRouteName: "Auth"
  }
);

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

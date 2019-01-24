import * as React from "react";
import {
  createSwitchNavigator,
  createAppContainer,
  createDrawerNavigator,
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import { Text, View } from "react-native";

import { Login } from "./modules/login/";
import { Register } from "./modules/register";
import { DashBoard } from "./modules/dashboard";
import { AuthLoadingScreen } from "./modules/auth";
import { Settings } from "./modules/settings";
import { AddBaby } from "./modules/baby/add";

const HomeScreenStackNavigator = createStackNavigator(
  {
    Home: DashBoard,
    AddBaby
  },
  {
    headerMode: "none",
    initialRouteName: "Home"
  }
);

const MainScreen = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreenStackNavigator,
      navigationOptions: () => {
        header: null;
      }
    },
    Settings: {
      screen: Settings
    }
  },
  {
    initialRouteName: "Home"
  }
);

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
    Main: {
      screen: MainScreen
    }
  },
  {
    initialRouteName: "Main"
  }
);

export const MainApp = createAppContainer(AppSwitchNavigator);

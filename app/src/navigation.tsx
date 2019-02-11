import { Ionicons } from "@expo/vector-icons";
import * as React from "react";
import {
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator,
  createSwitchNavigator,
  createDrawerNavigator
} from "react-navigation";
import { Platform } from "react-native";
import { AuthLoadingScreen } from "./modules/auth";
import { AddBaby } from "./modules/baby/add";
import { DashBoard } from "./modules/dashboard";
import { Login } from "./modules/login/";
import { Register } from "./modules/register";
import { Settings } from "./modules/settings";

const OS = Platform.OS;

const HomeScreenStackNavigator = createStackNavigator(
  {
    Home: {
      screen: DashBoard,
      navigationOptions: () => ({
        header: null
      })
    },
    AddBaby: {
      screen: AddBaby,
      navigationOptions: () => ({
        header: null
      })
    }
  },
  {
    initialRouteName: "Home"
  }
);

const MainScreen = createDrawerNavigator(
  {
    Home: {
      screen: HomeScreenStackNavigator,
      navigationOptions: () => ({
        title: "Home"
      })
    },
    Settings: {
      screen: Settings,
      navigationOptions: () => ({
        title: "Settings"
      })
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
    initialRouteName: "Auth"
  }
);

export const MainApp = createAppContainer(AppSwitchNavigator);

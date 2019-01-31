import { Ionicons } from "@expo/vector-icons";
import * as React from "react";
import {
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator,
  createSwitchNavigator
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
        // header: null
      })
    }
  },
  {
    initialRouteName: "Home"
  }
);

const MainScreen = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreenStackNavigator,
      navigationOptions: () => ({
        tabBarIcon: () => (
          <Ionicons
            name={OS === "ios" ? "ios-home" : "md-home"}
            size={30}
            color="#6534ff"
          />
        ),
        title: ""
      })
    },
    Settings: {
      screen: Settings,
      navigationOptions: () => ({
        tabBarIcon: () => (
          <Ionicons
            name={OS === "ios" ? "ios-settings" : "md-settings"}
            size={30}
            color="#6534ff"
          />
        ),
        title: ""
      })
    }
  },
  {
    initialRouteName: "Home",
    tabBarOptions: {
      style: {
        backgroundColor: "#fccdd3"
      }
    }
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

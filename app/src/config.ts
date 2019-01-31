import { Dimensions, Platform } from "react-native";

const { width, height } = Dimensions.get("window");

export const CONFIG = {
  colors: {},
  DEVICE_WIDTH: width,
  DEVICE_HEIGHT: height,
  OS: Platform.OS
};

import { Dimensions, Platform } from "react-native";

const { width, height } = Dimensions.get("window");

export const CONFIG = {
  colors: {
    AZUREISH_WHITE: "rgba(214, 226, 249, 1)",
    PALE_CORNFLOWER_BLUE: "rgba(171, 195, 255, 1);",
    UBE: "rgba(133, 129, 185, 1)",
    JORDY_BLUE: "rgba(143, 180, 245, 1)",
    DARK_PASTEL_PURPLE: "rgba(143, 123, 213, 1)"
  },
  DEVICE_WIDTH: width,
  DEVICE_HEIGHT: height,
  OS: Platform.OS
};

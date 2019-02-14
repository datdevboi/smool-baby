import * as React from "react";
import { View } from "react-native";

import ActionButton from "react-native-circular-action-menu";

import { BabyIcon } from "./icons/baby/BabyIcon";
import { CONFIG } from "../config";

export const ActionBtn = () => (
  <View style={{ marginBottom: 15 }}>
    {/*Rest of App come ABOVE the action button component!*/}
    <ActionButton buttonColor={CONFIG.colors.JORDY_BLUE}>
      <ActionButton.Item
        buttonColor={CONFIG.colors.DARK_PASTEL_PURPLE}
        title="Diaper"
        onPress={() => {}}
      >
        <BabyIcon name="diaper" size={20} color={"white"} />
      </ActionButton.Item>
      <ActionButton.Item
        buttonColor={CONFIG.colors.DARK_PASTEL_PURPLE}
        title="Bottle"
        onPress={() => {}}
      >
        <BabyIcon name="baby-bottle" size={20} color={"white"} />
      </ActionButton.Item>
      <ActionButton.Item
        buttonColor={CONFIG.colors.DARK_PASTEL_PURPLE}
        title="Sleep"
        onPress={() => {}}
      >
        <BabyIcon name="moon" size={20} color={"white"} />
      </ActionButton.Item>
    </ActionButton>
  </View>
);

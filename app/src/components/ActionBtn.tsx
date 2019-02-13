import * as React from "react";
import { View } from "react-native";

import ActionButton from "react-native-circular-action-menu";
import { Ionicons } from "@expo/vector-icons";
import { BabyIcon } from "./icons/baby/BabyIcon";

export const ActionBtn = () => (
  <View style={{ flex: 1, backgroundColor: "#f3f3f3" }}>
    {/*Rest of App come ABOVE the action button component!*/}
    <ActionButton buttonColor="rgba(231,76,60,1)">
      <ActionButton.Item
        buttonColor="#3498db"
        title="Diaper"
        onPress={() => {}}
      >
        <BabyIcon name="diaper" size={20} color={"white"} />
      </ActionButton.Item>
      <ActionButton.Item buttonColor="black" title="Diaper" onPress={() => {}}>
        <BabyIcon name="baby-bottle" size={20} color={"white"} />
      </ActionButton.Item>
      <ActionButton.Item
        buttonColor="#3498db"
        title="Diaper"
        onPress={() => {}}
      >
        <BabyIcon name="moon" size={20} color={"white"} />
      </ActionButton.Item>
    </ActionButton>
  </View>
);

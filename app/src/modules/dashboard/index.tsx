import * as React from "react";
import { View, Text, Button } from "react-native";

import { Ionicons } from "@expo/vector-icons";

export class DashBoard extends React.Component<any> {
  render() {
    return (
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flex: 1
        }}
      >
        <Text>Hello from Dashboard</Text>
        <Button
          title="Add baby"
          onPress={() => this.props.navigation.navigate("AddBaby")}
        >
          Add baby
        </Button>
      </View>
    );
  }
}

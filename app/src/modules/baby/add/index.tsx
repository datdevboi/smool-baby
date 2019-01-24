import * as React from "react";
import { Text, View } from "react-native";

export class AddBaby extends React.Component {
  static navigationOptions = {
    headerMode: "screen"
  };
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
        <Text> Add baby </Text>
      </View>
    );
  }
}

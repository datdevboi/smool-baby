import * as React from "react";
import { Button, Text, View } from "react-native";

export class AddBaby extends React.Component<any> {
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
        <Button
          title="Go back"
          onPress={() => this.props.navigation.navigate.goBack()}
        />
      </View>
    );
  }
}

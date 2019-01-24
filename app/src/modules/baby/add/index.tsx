import * as React from "react";
import { Text, View, Button } from "react-native";
import { NavigationScreenProp } from "react-navigation";

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

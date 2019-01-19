import * as React from "react";
import { View, Text } from "react-native";
import { NavigationNavigatorProps } from "react-navigation";
import { Button } from "react-native-elements";

export class Register extends React.Component<any> {
  handlePress = () => {
    this.props.navigation.navigate("Login");
  };
  render() {
    return (
      <View
        style={{
          display: "flex",
          flex: 1,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Text>Register</Text>
        <Button title="register" onPress={this.handlePress} clear={true}>
          Login
        </Button>
      </View>
    );
  }
}

import * as React from "react";
import { View, Text } from "react-native";
import { Logout } from "../logout";

export class Settings extends React.Component<any> {
  render() {
    return (
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <Logout navigation={this.props.navigation} />
      </View>
    );
  }
}

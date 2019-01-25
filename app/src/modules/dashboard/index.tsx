import * as React from "react";
import {
  Text,
  Button,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Platform
} from "react-native";

import { BabyDescription } from "../../components/BabyDescription";

export class DashBoard extends React.Component<any> {
  render() {
    return (
      <SafeAreaView style={styles.mainView}>
        <BabyDescription />
        <Button
          title="Add baby"
          onPress={() => this.props.navigation.navigate("AddBaby")}
        >
          Add baby
        </Button>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {
    display: "flex",
    flex: 1,
    ...Platform.select({
      android: {
        marginTop: StatusBar.currentHeight
      }
    })
  }
});

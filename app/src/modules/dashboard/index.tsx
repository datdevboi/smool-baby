import * as React from "react";
import {
  Text,
  Button,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Platform,
  View
} from "react-native";

import { BabyDescription } from "../../components/BabyDescription";

export class DashBoard extends React.Component<any> {
  render() {
    return (
      <SafeAreaView style={styles.mainView}>
        <BabyDescription
          imageSrc={
            "https://www.momjunction.com/wp-content/uploads/2014/05/Sweet-Cute-Baby-Girl-Names-With-Meanings.jpg"
          }
          babyName="Ivy"
          date="11/19/2018"
          style={{ flex: 2 }}
        />
        <View style={styles.listView}>
          <Text>List</Text>
        </View>
        {/* <Button
          title="Add baby"
          onPress={() => this.props.navigation.navigate("AddBaby")}
        >
          Add baby
        </Button> */}
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
  },
  listView: {
    flex: 10,
    backgroundColor: "#f6f1ed"
  }
});

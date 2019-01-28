import * as React from "react";
import { View, StyleSheet, Text, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BabyImage } from "./BabyImage";

interface Props {
  imageSrc: any;
  babyName: String;
  date: String;
  style?: any;
}

const OS = Platform.OS;

export class BabyDescription extends React.Component<Props> {
  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <BabyImage
          src={this.props.imageSrc}
          style={styles.babyPic}
          babyName="Ivy"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#bbc4ef",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  babyDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 4
  },
  babyPic: {
    marginRight: 20
  },
  changeBabyContainer: {
    flex: 6,
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  babyName: {
    fontSize: 20,
    fontWeight: "300"
  }
});

import * as React from "react";
import { View, StyleSheet, Text } from "react-native";
import { BabyImage } from "./BabyImage";

interface Props {
  imageSrc: any;
  babyName: String;
  date: String;
  style?: any;
}

export class BabyDescription extends React.Component<Props> {
  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <View style={styles.babyDetails}>
          <BabyImage src={this.props.imageSrc} style={styles.babyPic} />

          <View>
            <Text style={styles.babyName}>{this.props.babyName}</Text>
            <Text>{this.props.date}</Text>
          </View>
        </View>

        <View style={styles.changeBabyContainer}>
          <Text style={styles.changeBaby}>hi</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
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
  changeBaby: {
    alignSelf: "flex-start"
  },
  babyName: {
    fontSize: 20,
    fontWeight: "300"
  }
});

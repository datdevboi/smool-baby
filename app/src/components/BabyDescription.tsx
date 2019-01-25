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
        <BabyImage src={this.props.imageSrc} />
        <View>
          <Text>{this.props.babyName}</Text>
          <Text>{this.props.date}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  }
});

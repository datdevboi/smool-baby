import * as React from "react";
import {
  View,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

import { BabyImage } from "./BabyImage";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  imageSrc: any;
  babyName: String;
  handlePress: () => void;
  style?: any;
}

export class TopBar extends React.Component<Props> {
  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <View
          style={{
            alignSelf: "flex-start",
            padding: 10
          }}
        >
          <Ionicons name="ios-menu" size={wp("4%")} />
        </View>

        <TouchableOpacity onPress={this.props.handlePress}>
          <BabyImage
            size={hp("10%")}
            src={this.props.imageSrc}
            babyName={this.props.babyName as string}
          />
        </TouchableOpacity>
        <View
          style={{
            alignSelf: "flex-start",
            padding: 10
          }}
        >
          <View />
          {/* <Ionicons name="ios-moon" size={wp("4%")} /> */}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#bbc4ef",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }
});

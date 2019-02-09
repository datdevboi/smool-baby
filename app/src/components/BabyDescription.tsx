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

interface Props {
  imageSrc: any;
  babyName: String;
  handlePress: () => void;
  style?: any;
}

export class BabyDescription extends React.Component<Props> {
  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <TouchableOpacity onPress={this.props.handlePress}>
          <BabyImage
            size={hp("10%")}
            src={this.props.imageSrc}
            babyName={this.props.babyName as string}
          />
        </TouchableOpacity>
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

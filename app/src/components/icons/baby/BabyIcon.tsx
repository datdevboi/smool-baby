import React from "react";
import { createIconSetFromFontello } from "@expo/vector-icons";
import * as config from "./config.json";
import { Font } from "expo";

const Icon = createIconSetFromFontello(config, "baby");

interface Props {
  name: string;
  size: number;
  color: string;
}
export class BabyIcon extends React.Component<Props> {
  state = {
    fontLoaded: false
  };
  async componentDidMount() {
    await Font.loadAsync({
      baby: require("../../../../assets/baby.ttf")
    });

    this.setState({ fontLoaded: true });
  }
  render() {
    if (!this.state.fontLoaded) {
      return null;
    }

    return (
      <Icon
        name={this.props.name}
        size={this.props.size}
        color={this.props.color}
      />
    );
  }
}

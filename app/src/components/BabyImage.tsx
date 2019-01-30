import * as React from "react";
import { Avatar } from "react-native-ui-lib";

interface Props {
  src: any;
  babyName: string;
  size: number;
}
export class BabyImage extends React.Component<Props> {
  render() {
    return (
      <Avatar
        ribbonLabel={this.props.babyName}
        size={this.props.size}
        imageSource={{ uri: this.props.src }}
      />
    );
  }
}

import * as React from "react";
import { Avatar } from "react-native-ui-lib";

interface Props {
  src: any;
  babyName: string;
}
export class BabyImage extends React.Component<Props> {
  render() {
    return (
      <Avatar
        ribbonLabel={this.props.babyName}
        size={80}
        imageSource={{ uri: this.props.src }}
      />
    );
  }
}

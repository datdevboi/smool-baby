import * as React from "react";
import { Image, Avatar } from "react-native-ui-lib";

interface Props {
  src: any;
  style?: any;
}
export class BabyImage extends React.Component<Props> {
  render() {
    return (
      <Avatar
        imageStyle={[
          {
            width: 60,
            height: 60
          },
          this.props.style
        ]}
        imageSource={{ uri: this.props.src }}
      />
    );
  }
}

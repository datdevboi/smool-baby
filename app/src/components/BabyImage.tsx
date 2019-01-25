import * as React from "react";
import { Image } from "react-native-ui-lib";

interface Props {
  src: any;
}
export class BabyImage extends React.Component<Props> {
  render() {
    return (
      <Image
        style={{
          width: 50,
          height: 50
        }}
        source={{ uri: this.props.src }}
      />
    );
  }
}

import * as React from "react";
import { Image } from "react-native-ui-lib";

export class BabyImage extends React.Component {
  render() {
    return (
      <Image
        style={{
          width: 50,
          height: 50
        }}
        source={{
          uri:
            "https://www.momjunction.com/wp-content/uploads/2014/05/Sweet-Cute-Baby-Girl-Names-With-Meanings.jpg"
        }}
      />
    );
  }
}

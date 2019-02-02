import * as React from "react";

import { FieldProps } from "formik";
import { TouchableWithoutFeedback } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CONFIG } from "../config";
import { Permissions, ImagePicker } from "expo";

export class PictureInput extends React.Component<
  FieldProps<any> & {
    name: string;
  }
> {
  getPicture = async (setFieldValue: any, name: string) => {
    const { status, permissions } = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );

    if (status !== "granted") {
      console.log(
        "Hey! You might want to enable notifications for my app, they are good."
      );
    } else {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "Images",
        quality: 0.5,
        allowsEditing: true,
        base64: true
      });

      if (!result.cancelled) {
        setFieldValue(name, {
          pictureUri: result.uri,
          pictureType: result.type
        });
      }
    }
  };

  render() {
    const {
      field: { name },
      form: { setFieldValue },
      value,
      ...props
    } = this.props;

    return (
      <TouchableWithoutFeedback
        onPress={() => this.getPicture(setFieldValue, name)}
      >
        <Ionicons
          name={CONFIG.OS == "ios" ? "ios-camera" : "md-camera"}
          size={40}
        />
      </TouchableWithoutFeedback>
    );
  }
}

import * as React from "react";

import { TextField } from "react-native-ui-lib";
import { FieldProps } from "formik";
import { CONFIG } from "../config";
import {
  DatePickerIOS,
  View,
  TouchableWithoutFeedback,
  DatePickerAndroid
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export class CalendarInput extends React.Component<
  FieldProps<any> & {
    name: string;
    value: string;
  }
> {
  callAndroidDatePicker = async (setFieldValue: any, name: string) => {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        // Use `new Date()` for current date.

        date: new Date()
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        // Selected year, month (0-11), day

        setFieldValue(name, new Date(year, month, day));
      }
    } catch ({ code, message }) {
      console.warn("Cannot open date picker", message);
    }
  };
  render() {
    const {
      field: { name },
      form: { values, setFieldValue },
      value,
      ...props
    } = this.props;

    return (
      <>
        {CONFIG.OS === "ios" && (
          <DatePickerIOS
            maximumDate={new Date()}
            mode="date"
            date={values[name]}
            onDateChange={date => {
              setFieldValue(name, date);
            }}
          />
        )}

        {CONFIG.OS == "android" && (
          <View>
            <TouchableWithoutFeedback
              onPress={() => this.callAndroidDatePicker(setFieldValue, name)}
            >
              <Ionicons name="md-calendar" size={40} />
            </TouchableWithoutFeedback>
          </View>
        )}
      </>
    );
  }
}

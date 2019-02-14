import * as React from "react";

import { FieldProps } from "formik";
import dayjs from "dayjs";
import { CONFIG } from "../config";
import { Modal } from "react-native-ui-lib";
import {
  DatePickerIOS,
  View,
  TouchableWithoutFeedback,
  DatePickerAndroid,
  TouchableOpacity,
  Text,
  StyleSheet
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

export class CalendarInput extends React.Component<
  FieldProps<any> & {
    name: string;
    value: string;
  }
> {
  state = {
    showCalendar: false
  };

  closeCalendar = () => {
    this.setState(() => ({
      showCalendar: false
    }));
  };

  openCalendar = async () => {
    const {
      field: { name },
      form: { values, setFieldValue }
    } = this.props;
    if (CONFIG.OS === "ios") {
      this.setState(() => ({
        showCalendar: true
      }));
    } else {
      await this.callAndroidDatePicker(setFieldValue, name);
    }
  };
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
      <View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <TouchableOpacity onPress={() => this.openCalendar()}>
            <Ionicons
              name={CONFIG.OS === "ios" ? "ios-calendar" : "md-calendar"}
              size={wp("7%")}
            />
          </TouchableOpacity>
          <Text>{dayjs(values[name]).format("MM-DD-YYYY")}</Text>
        </View>

        {CONFIG.OS === "ios" && (
          <Modal
            visible={this.state.showCalendar}
            onRequestClose={this.closeCalendar}
            transparent={true}
            animationType="slide"
          >
            <BlurView
              tint="default"
              intensity={75}
              style={[StyleSheet.absoluteFill]}
            >
              <View
                style={{
                  alignSelf: "center",
                  marginTop: "auto",
                  marginBottom: "auto",
                  height: hp("40%"),
                  width: wp("50%"),
                  backgroundColor: "white"
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    alignItems: "center"
                  }}
                >
                  <TouchableOpacity onPress={this.closeCalendar}>
                    <Ionicons
                      size={40}
                      name="ios-checkmark-circle-outline"
                      color="green"
                    />
                  </TouchableOpacity>
                </View>
                <View style={{ flex: 1, justifyContent: "center" }}>
                  <DatePickerIOS
                    maximumDate={new Date()}
                    mode="date"
                    date={values[name]}
                    onDateChange={date => {
                      setFieldValue(name, date);
                    }}
                  />
                </View>
              </View>
            </BlurView>
          </Modal>
        )}
      </View>
    );
  }
}

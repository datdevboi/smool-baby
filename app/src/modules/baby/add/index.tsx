import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  DatePickerIOS,
  DatePickerAndroid,
  TouchableWithoutFeedback
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { Ionicons } from "@expo/vector-icons";
import { Formik, Field } from "formik";
import { Card, Button } from "react-native-ui-lib";
import { InputField } from "../../../components/InputField";
import { CONFIG } from "../../../config";

interface FormValues {
  name: string;
  dob: Date;
}

export class AddBaby extends React.Component<any> {
  callAndroidDatePicker = async (setFieldValue: any) => {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        // Use `new Date()` for current date.

        date: new Date()
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        // Selected year, month (0-11), day

        setFieldValue("dob", new Date(year, month, day));
      }
    } catch ({ code, message }) {
      console.warn("Cannot open date picker", message);
    }
  };
  render() {
    return (
      <Formik<FormValues>
        initialValues={{
          name: "",
          dob: new Date(),
          picture: ""
        }}
        onSubmit={async (values, actions) => {
          actions.setSubmitting(false);
          console.log(values);
          actions.resetForm();
        }}
      >
        {({ handleSubmit, isSubmitting, values, setFieldValue }) => {
          return (
            <View
              style={{
                display: "flex",
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Card
                width={wp("75%")}
                height={hp("60%")}
                containerStyle={{
                  padding: 10
                }}
              >
                <View style={styles.inputView}>
                  <Text style={styles.title}>Add Baby</Text>
                  <Field
                    component={InputField}
                    name="name"
                    title="name"
                    autoCapitalize="none"
                    titleColor="black"
                    enableErrors={true}
                  />
                  {CONFIG.OS === "ios" && (
                    <DatePickerIOS
                      maximumDate={new Date()}
                      mode="date"
                      date={values.dob as any}
                      onDateChange={date => {
                        console.log(date);
                      }}
                    />
                  )}

                  {CONFIG.OS == "android" && (
                    <View style={{ alignSelf: "center" }}>
                      <TouchableWithoutFeedback
                        onPress={() =>
                          this.callAndroidDatePicker(setFieldValue)
                        }
                      >
                        <Ionicons name="md-calendar" size={40} />
                      </TouchableWithoutFeedback>
                    </View>
                  )}

                  <View style={{ alignSelf: "center" }}>
                    <TouchableWithoutFeedback onPress={() => null}>
                      <Ionicons
                        name={CONFIG.OS == "ios" ? "ios-camera" : "md-camera"}
                        size={40}
                      />
                    </TouchableWithoutFeedback>
                  </View>

                  <View style={styles.buttonView}>
                    <Button
                      label="Add"
                      disabled={isSubmitting}
                      onPress={() => handleSubmit()}
                    />
                  </View>
                </View>
              </Card>
            </View>
          );
        }}
      </Formik>
    );
  }
}

const styles = StyleSheet.create({
  inputView: {
    flex: 2,
    display: "flex",
    justifyContent: "space-between"
  },
  title: {
    alignSelf: "center",
    marginBottom: 10,
    fontSize: 20
  },
  buttonView: {
    display: "flex",

    marginTop: 5,

    marginBottom: 5,
    justifyContent: "space-between"
  }
});

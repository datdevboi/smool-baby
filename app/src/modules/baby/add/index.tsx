import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  DatePickerIOS,
  DatePickerAndroid,
  TouchableWithoutFeedback
} from "react-native";
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
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flex: 1
        }}
      >
        <Formik<FormValues>
          initialValues={{
            name: "",
            dob: new Date()
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
                  width={450}
                  height={400}
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
                  </View>
                  <View style={styles.buttonView}>
                    <Button
                      label="Add"
                      disabled={isSubmitting}
                      onPress={() => handleSubmit()}
                    />
                  </View>
                </Card>
              </View>
            );
          }}
        </Formik>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputView: {
    flex: 2,
    display: "flex",
    justifyContent: "center"
  },
  title: {
    alignSelf: "center",
    marginBottom: 10,
    fontSize: 20
  },
  buttonView: {
    display: "flex",
    flex: 1,
    marginTop: 5,
    marginBottom: 5,
    justifyContent: "space-between"
  },
  buttonViewText: {
    alignSelf: "center",
    marginTop: 5,
    marginBottom: 5,
    fontSize: 15
  }
});

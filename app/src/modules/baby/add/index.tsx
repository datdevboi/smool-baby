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
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { ReactNativeFile } from "apollo-upload-client";
import { Ionicons } from "@expo/vector-icons";
import { Formik, Field } from "formik";

import { Card, Button } from "react-native-ui-lib";
import { InputField } from "../../../components/InputField";
import { CONFIG } from "../../../config";

import { BabyImage } from "../../../components/BabyImage";
import { PictureInput } from "../../../components/PictureInput";

interface FormValues {
  name: string;
  dob: Date;
  picture: {
    pictureUri: string;
    pictureType: string;
  };
}

const ADD_BABY_MUTATION = gql`
  mutation ADD_BABY_MUTATION(
    $name: String!
    $dob: DateTime!
    $picture: Upload!
  ) {
    createBaby(input: { name: $name, dob: $dob, picture: $picture })
  }
`;

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
      <Mutation mutation={ADD_BABY_MUTATION}>
        {addBaby => (
          <Formik<FormValues>
            initialValues={{
              name: "",
              dob: new Date(),
              picture: {
                pictureUri: "",
                pictureType: ""
              }
            }}
            onSubmit={async (values, actions) => {
              actions.setSubmitting(false);

              const file = new ReactNativeFile({
                uri: values.picture.pictureUri,
                name: `${values.name}-${values.dob}`,
                type: values.picture.pictureType
              });

              try {
                const response = await addBaby({
                  variables: {
                    name: values.name,
                    dob: values.dob,
                    picture: file
                  }
                });
              } catch (err) {
                console.log(err);
              }
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
                          date={values.dob}
                          onDateChange={date => {
                            setFieldValue("dob", date);
                          }}
                        />
                      )}

                      {CONFIG.OS == "android" && (
                        <View>
                          <TouchableWithoutFeedback
                            onPress={() =>
                              this.callAndroidDatePicker(setFieldValue)
                            }
                          >
                            <Ionicons name="md-calendar" size={40} />
                          </TouchableWithoutFeedback>
                        </View>
                      )}

                      <View>
                        {/* <TouchableWithoutFeedback
                          onPress={() => this.getPicture(setFieldValue)}
                        >
                          <Ionicons
                            name={
                              CONFIG.OS == "ios" ? "ios-camera" : "md-camera"
                            }
                            size={40}
                          />
                        </TouchableWithoutFeedback> */}
                        <Field component={PictureInput} name="picture" />
                        {!!values.picture.pictureUri && (
                          <BabyImage
                            src={values.picture.pictureUri}
                            babyName={values.name}
                            size={40}
                          />
                        )}
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
        )}
      </Mutation>
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

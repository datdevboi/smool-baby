import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { ReactNativeFile } from "apollo-upload-client";
import { Ionicons } from "@expo/vector-icons";
import { Formik, Field } from "formik";

import { Card, Button, Toast } from "react-native-ui-lib";
import { InputField } from "../../../components/InputField";

import { BabyImage } from "../../../components/BabyImage";
import { PictureInput } from "../../../components/PictureInput";
import { CalendarInput } from "../../../components/CalendarInput";
import { PickerField } from "../../../components/PickerField";
import { CONFIG } from "../../../config";

interface FormValues {
  name: string;
  dob: Date;
  picture: {
    pictureUri: string;
    pictureType: string;
  };
  gender: string;
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
  state = {
    showToast: false
  };
  render() {
    return (
      <Mutation mutation={ADD_BABY_MUTATION}>
        {(addBaby, { client }) => (
          <Formik<FormValues>
            initialValues={{
              name: "",
              dob: new Date(),
              picture: {
                pictureUri: "",
                pictureType: ""
              },
              gender: ""
            }}
            onSubmit={async (values, actions) => {
              if (values.name === "") {
                actions.setFieldError("name", "Name is required");
                return;
              }

              if (values.gender === "") {
                actions.setFieldError("gender", "Gender is required");
                return;
              }

              actions.setSubmitting(false);

              const file = new ReactNativeFile({
                uri: values.picture.pictureUri,
                name: `${values.name}-${values.dob}`,
                type: values.picture.pictureType
              });

              try {
                const { data } = await addBaby({
                  variables: {
                    name: values.name,
                    dob: values.dob,
                    picture: file
                  }
                });

                if (data && data.createBaby) {
                  client.cache.writeData({
                    data: {
                      baby: {
                        __typename: "CurrentBaby",
                        id: data.createBaby.id,
                        pictureUrl: data.createBaby.pictureUrl,
                        name: data.createBaby.name
                      }
                    }
                  });
                  this.props.navigation.navigate("Home");
                } else {
                  this.setState({ showToast: true });
                }
              } catch (err) {
                console.log(err);
                this.setState({ showToast: true });
              }
            }}
          >
            {({ handleSubmit, isSubmitting, values }) => {
              const action = true
                ? [
                    {
                      label: "Undo",
                      backgroundColor: "red",
                      onPress: () => console.log("log")
                    }
                  ]
                : [];
              return (
                <View
                  style={{
                    display: "flex",
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Toast
                    visible={this.state.showToast}
                    position={"top"}
                    backgroundColor={"#a50b14"}
                    message="An error has occured, try in a little bit"
                    onDismiss={() => this.setState({ showToast: false })}
                    allowDismiss={true}
                    zIndex={150}
                  />
                  <Card
                    width={wp("75%")}
                    height={hp("60%")}
                    containerStyle={{
                      padding: 10
                    }}
                  >
                    <View style={styles.inputView}>
                      <Text style={styles.title}>Add Baby</Text>
                      <View style={{ flex: 4 }}>
                        <Field
                          component={InputField}
                          name="name"
                          title="Name:"
                          autoCapitalize="none"
                          titleColor={CONFIG.colors.JORDY_BLUE}
                          enableErrors={true}
                        />

                        <Field
                          component={PickerField}
                          enableErrors={true}
                          name="gender"
                          titleColor={CONFIG.colors.JORDY_BLUE}
                          title="Gender:"
                          options={[
                            { label: "Male", value: "Male" },
                            { label: "Female", value: "Female" }
                          ]}
                        />

                        <Field component={CalendarInput} name="dob" />

                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between"
                          }}
                        >
                          <Field component={PictureInput} name="picture" />
                          {!!values.picture.pictureUri && (
                            <BabyImage
                              src={values.picture.pictureUri}
                              babyName={values.name}
                              size={40}
                            />
                          )}
                        </View>
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
    flex: 1,
    display: "flex",
    justifyContent: "flex-start"
  },
  title: {
    alignSelf: "center",
    marginBottom: 10,
    fontSize: 20,
    flex: 1
  },
  buttonView: {
    display: "flex",
    flex: 1,

    marginTop: 5,

    marginBottom: 5,
    justifyContent: "space-between"
  }
});

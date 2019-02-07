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
  state = {
    showToast: false
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
                const { data } = await addBaby({
                  variables: {
                    name: values.name,
                    dob: values.dob,
                    picture: file
                  }
                });

                if (data && data.createBaby) {
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
                      <Field
                        component={InputField}
                        name="name"
                        title="name"
                        autoCapitalize="none"
                        titleColor="black"
                        enableErrors={true}
                      />
                      <Field component={CalendarInput} name="dob" />

                      <View>
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

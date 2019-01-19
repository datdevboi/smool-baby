import * as React from "react";
import { View, StyleSheet, Text } from "react-native";

import { Button, Card } from "react-native-ui-lib";
import { Field, Formik } from "formik";
import gql from "graphql-tag";

import { InputField } from "../../components/InputField";

interface FormValues {
  email: string;
  password: string;
}

export class Login extends React.Component<any> {
  handlePress = () => {
    this.props.navigation.navigate("Register");
  };
  render() {
    return (
      <View
        style={{
          display: "flex",
          flex: 1,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Formik<FormValues>
          initialValues={{
            email: "nani",
            password: ""
          }}
          onSubmit={values => {
            console.log(values);
          }}
        >
          {({ handleSubmit, isSubmitting }) => (
            <Card
              width={400}
              height={350}
              containerStyle={{
                padding: 20,
                marginBottom: 15
              }}
            >
              <View style={styles.inputView}>
                <Field
                  component={InputField}
                  name="email"
                  title="email"
                  autoCapitalize="none"
                  titleColor="black"
                />
                <Field
                  component={InputField}
                  name="password"
                  title="password"
                  secureTextEntry={true}
                  autoCapitalize="none"
                  titleColor="black"
                />
              </View>
              <View style={styles.buttonView}>
                <Button
                  label="Login"
                  disabled={isSubmitting}
                  onPress={() => handleSubmit()}
                />
                <Text style={styles.buttonViewText}>Or</Text>
                <Button
                  label="register"
                  outline={true}
                  onPress={this.handlePress}
                />
              </View>
            </Card>
          )}
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
  buttonView: {
    display: "flex",
    flex: 1,
    marginTop: 5,
    justifyContent: "space-between"
  },
  buttonViewText: {
    alignSelf: "center",
    marginTop: 5,
    marginBottom: 5,
    fontSize: 15
  }
});

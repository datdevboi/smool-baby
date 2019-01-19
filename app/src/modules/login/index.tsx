import * as React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Mutation } from "react-apollo";
import { Button, Card } from "react-native-ui-lib";
import { Field, Formik } from "formik";
import gql from "graphql-tag";

import { InputField } from "../../components/InputField";

interface FormValues {
  email: string;
  password: string;
}

const LoginMutation = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      email
    }
  }
`;

export class Login extends React.Component<any> {
  handlePress = () => {
    this.props.navigation.navigate("Register");
  };
  render() {
    return (
      <Mutation mutation={LoginMutation}>
        {({ mutate }) => (
          <Formik<FormValues>
            initialValues={{
              email: "",
              password: ""
            }}
            onSubmit={values => {
              console.log(values);
            }}
          >
            {({ handleSubmit, isSubmitting }) => (
              <View
                style={{
                  display: "flex",
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Card
                  width={400}
                  height={375}
                  containerStyle={{
                    padding: 15
                  }}
                >
                  <View style={styles.inputView}>
                    <Field
                      component={InputField}
                      name="email"
                      title="email"
                      autoCapitalize="none"
                      titleColor="black"
                      enableErrors={true}
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
              </View>
            )}
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
    justifyContent: "center"
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

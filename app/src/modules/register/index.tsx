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

const RegisterMutation = gql`
  mutation RegisterMutation($email: String!, $password: String!) {
    register(input: { email: $email, password: $password }) {
      user {
        email
        id
      }
      errors {
        path
        message
      }
    }
  }
`;

export class Register extends React.Component<any> {
  handlePress = () => {
    this.props.navigation.navigate("Login");
  };
  render() {
    return (
      <Mutation mutation={RegisterMutation}>
        {registerMutation => (
          <Formik<FormValues>
            initialValues={{
              email: "",
              password: ""
            }}
            onSubmit={async (values, actions) => {
              const { data } = await registerMutation({ variables: values });

              const { register } = data;
              if (register.errors) {
                const err = register.errors[0];
                actions.setFieldError(err.path, err.message);
                actions.setSubmitting(false);
              } else {
                this.props.navigation.navigate("Main");
              }
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
                    <Text style={styles.title}>Register</Text>
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
                      label="Register"
                      disabled={isSubmitting}
                      onPress={() => handleSubmit()}
                    />
                    <Text style={styles.buttonViewText}>Or</Text>
                    <Button
                      label="login"
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

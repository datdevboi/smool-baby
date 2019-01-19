import * as React from "react";
import { View, Text } from "react-native";

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
          {({ handleSubmit }) => (
            <Card
              containerStyle={{
                width: 200,
                height: 200,
                padding: 15,
                marginBottom: 15
              }}
            >
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
              <Button label="Login" onPress={() => handleSubmit()} />
            </Card>
          )}
        </Formik>

        <Button label="register" onPress={this.handlePress} />
      </View>
    );
  }
}

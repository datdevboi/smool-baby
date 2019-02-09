import * as React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Mutation, ApolloConsumer } from "react-apollo";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

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

const CURRENT_BABY_QUERY = gql`
  query {
    currentBaby {
      id
      name
      pictureUrl
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
        {loginMutation => (
          <ApolloConsumer>
            {client => (
              <Formik<FormValues>
                initialValues={{
                  email: "",
                  password: ""
                }}
                onSubmit={async (values, actions) => {
                  const { data } = await loginMutation({ variables: values });

                  const { login } = data;
                  if (login.errors) {
                    const firstErr = login.errors[0];
                    actions.setFieldError("email", firstErr.message);
                    actions.setFieldError("password", firstErr.message);
                    actions.setSubmitting(false);
                  } else {
                    const {
                      data: { currentBaby }
                    } = await client.query({
                      query: CURRENT_BABY_QUERY
                    });

                    if (currentBaby && currentBaby.id) {
                      client.cache.writeData({
                        data: {
                          baby: {
                            __typename: "CurrentBaby",
                            id: currentBaby.id,
                            pictureUrl: currentBaby.pictureUrl,
                            name: currentBaby.name
                          }
                        }
                      });
                      this.props.navigation.navigate("Main");
                    }
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
                      width={wp("80%")}
                      height={hp("70%")}
                      containerStyle={{
                        padding: 15
                      }}
                    >
                      <View style={styles.inputView}>
                        <Text style={styles.title}>Login</Text>
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
          </ApolloConsumer>
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

import * as React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { Button } from "react-native-ui-lib";

const LOGOUT_MUTATION = gql`
  mutation {
    logout
  }
`;

export const Logout: React.SFC<any> = ({ navigation }) => (
  <Mutation mutation={LOGOUT_MUTATION}>
    {(logout, { client }) => (
      <Button
        label="logout"
        onPress={async () => {
          await logout();

          await client.resetStore();

          navigation.navigate("Login");
        }}
      />
    )}
  </Mutation>
);

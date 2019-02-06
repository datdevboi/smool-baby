import * as React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import { LoaderScreen } from "react-native-ui-lib";

const ME_QUERY = gql`
  query {
    me {
      email
    }
  }
`;

export class AuthLoadingScreen extends React.Component<any> {
  render() {
    return (
      <Query
        query={ME_QUERY}
        onCompleted={data => {
          if (data.me && data.me.email) {
            this.props.navigation.navigate("Main");
          } else {
            this.props.navigation.navigate("Login");
          }
        }}
      >
        {({ data, loading }) => {
          return <LoaderScreen loaderColor="blue" message="Loading..." />;
        }}
      </Query>
    );
  }
}

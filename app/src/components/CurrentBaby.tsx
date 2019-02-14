import * as React from "react";
import { Query, QueryResult } from "react-apollo";
import gql from "graphql-tag";

const CURRENT_BABY_QUERY = gql`
  query {
    baby @client {
      name
      id
      pictureUrl
    }
  }
`;

interface Props {
  children: (queryresults: QueryResult) => any;
}

export class CurrentBaby extends React.Component<Props> {
  render() {
    return (
      <Query query={CURRENT_BABY_QUERY}>
        {queyResults => {
          return this.props.children(queyResults);
        }}
      </Query>
    );
  }
}

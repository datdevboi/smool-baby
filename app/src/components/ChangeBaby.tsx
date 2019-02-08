import * as React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const CHANGE_BABY_MUTATION = gql`
  mutation CHANGE_BABY_MUTATION(
    $babyId: ID!
    $pictureUrl: String!
    $name: String!
  ) {
    changeCurrentBaby(name: $name, babyId: $babyId, pictureUrl: $pictureUrl)
      @client
  }
`;

interface Props {
  children: ({ mutate }: any) => any;
}

export class ChangeBaby extends React.Component<Props> {
  render() {
    return (
      <Mutation mutation={CHANGE_BABY_MUTATION}>
        {mutate => {
          return this.props.children({ mutate });
        }}
      </Mutation>
    );
  }
}

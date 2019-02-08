import gql from "graphql-tag";

export const defaults = {
  baby: {
    __typename: "CurrentBaby",
    id: "",
    pictureUrl: "",
    name: ""
  }
};

export const resolvers = {
  Mutation: {
    changeCurrentBaby: (
      obj,
      { babyId, pictureUrl, name }: any,
      { cache },
      info
    ) => {
      const data = {
        data: {
          baby: {
            __typename: "CurrentBaby",
            id: babyId,
            pictureUrl: pictureUrl,
            name
          }
        }
      };

      cache.writeData(data);

      return data;
    }
  }
  // Query: {
  //   currentBaby: (obj, args, { cache }, info) => {
  //     const CURRENT_BABY_QUERY = gql`
  //       query currentBaby @client {
  //         id
  //         pictureUrl
  //         name
  //       }
  //     `;
  //     const data = cache.readQuery({ query: CURRENT_BABY_QUERY });

  //     console.log(data);

  //     return data;
  //   }
  // }
};

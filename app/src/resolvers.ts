export const defaults = {
  currenyBaby: {
    id: "",
    pictureUrl: ""
  }
};

export const resolvers = {
  Mutation: {
    changeCurrentBaby: (obj, { babyId, pictureUrl }, context, info) => {}
  }
};

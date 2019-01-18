import { ResolverMap } from "../../types";

export const resolvers: ResolverMap = {
  Mutation: {
    logout: async (_, args, { req, res }: any) => {
      delete req.user;
      delete req.userId;

      res.clearCookie("token");

      return true;
    }
  }
};

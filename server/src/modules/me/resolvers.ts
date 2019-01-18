import { ResolverMap } from "../../types";

export const resolvers: ResolverMap = {
  Query: {
    me: async (_, args, { prisma, req }: any) => {
      if (!req.userId) {
        return null;
      }

      return prisma.user({
        id: req.userId
      });
    }
  }
};

import { IResolvers } from "apollo-server";

export const resolvers: IResolvers = {
  Query: {
    me: async (_, args, { prisma, req }: any) => {
      if (!req.userId) {
        return null;
      }

      return prisma.user({
        id: req.userId
      });
    }
  },
  User: {
    babies: (parent, _, { prisma }, info) => {
      const userId = parent.id;

      return prisma.babies({
        where: {
          parent: {
            id: userId
          }
        }
      });
    }
  }
};

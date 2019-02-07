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
    },
    currentBaby: async (parent, _, { prisma, req }, info) => {
      if (!req.userId) {
        return null;
      }
      const userId = req.userId;

      const babies = await prisma.babies({
        where: {
          parent: {
            id: userId
          }
        },
        orderBy: "updatedAt_DESC"
      });

      const baby = babies[0];

      if (!baby) {
        return null;
      }

      return baby;
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

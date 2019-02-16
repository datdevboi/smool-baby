import { IResolvers } from "apollo-server-express";
import { Context } from "../../../types";

export const resolvers: IResolvers<any, Context> = {
  Mutation: {
    addDiaper: async (parent, { babyId, time, type }, { prisma }, info) => {
      const diaper = await prisma.createDiaper({
        type,
        time,
        baby: {
          connect: {
            id: babyId
          }
        }
      });

      if (!diaper) {
        return false;
      }

      return diaper;
    }
  }
};

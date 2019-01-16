import { ResolverMap } from "../../types";

export const resolvers: ResolverMap = {
  Mutation: {
    register: async (_, args, { prisma }) => {
      const user = await prisma.createUser({
        email: args.email,
        password: args.password
      });

      return user;
    }
  }
};

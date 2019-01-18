import { ResolverMap } from "../../types";
import bcrypt from "bcryptjs";

export const resolvers: ResolverMap = {
  Mutation: {
    login: async (_, args, { prisma }) => {
      const { email, password } = args.input;

      // check if user exist with that email
      const user = await prisma.user({
        email
      });

      if (!user) {
        return {
          errors: [
            {
              path: "email",
              message: "invalid credentials"
            }
          ]
        };
      }

      // check password

      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        return {
          errors: [
            {
              path: "password",
              message: "invalid crendentials"
            }
          ]
        };
      }

      // the user is valid

      return {
        user
      };
    }
  }
};

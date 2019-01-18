import { ResolverMap } from "../../types";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const resolvers: ResolverMap = {
  Mutation: {
    login: async (_, args, { prisma, res }) => {
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

      const token = jwt.sign(
        {
          userId: user.id
        },
        "randomtokenapp"
      );

      // the user is valid, so set cookie and then return user
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 365
      });

      return {
        user
      };
    }
  }
};

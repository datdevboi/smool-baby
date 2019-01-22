import dayjs from "dayjs";
import { GraphQLScalarType, Kind } from "graphql";
import { IResolvers } from "apollo-server";

export const resolvers: IResolvers = {
  Mutation: {
    createBaby: async (_, args, { prisma, res, req }) => {
      const query = `
        mutation createBaby($name: String!, $dob: DateTime!, $userId: ID!) {
          createBaby(data: {
            name: $name,
            dob: $dob,
            parent: {
              connect: {
                id: $userId
              }
            }
          }) {
            name
            dob
          }
        }
      
      `;

      const baby = await prisma.$graphql(query, {
        name: args.input.name,
        dob: args.input.dob,
        userId: req.userId
      });

      return true;
    }
  }
  //   Date: new GraphQLScalarType({
  //     name: "Date",
  //     description: "Custom description for the date scalar",
  //     parseValue(value) {
  //       return dayjs(value);
  //     },
  //     serialize(value) {
  //       return dayjs(value).format("MM-DD-YYYY");
  //     },
  //     parseLiteral(ast) {
  //       if (ast.kind === Kind.STRING) {
  //         return dayjs(ast.value);
  //       }

  //       return null;
  //     }
  //   })
};

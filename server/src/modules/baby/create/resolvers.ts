import dayjs from "dayjs";
import { createWriteStream } from "fs";
import * as shortid from "shortid";
import { GraphQLScalarType, Kind } from "graphql";
import { IResolvers } from "apollo-server";

const storeUpload = async (stream: any, mimetype: string): Promise<any> => {
  // aseq2
  const extension = mimetype.split("/")[1];
  const id = `${shortid.generate()}.${extension}`;
  const path = `images/${id}`;

  return new Promise((resolve, reject) =>
    stream
      .pipe(createWriteStream(path))
      .on("finish", () => resolve({ id, path }))
      .on("error", reject)
  );
};

const processUpload = async (upload: any) => {
  const { stream, mimetype } = await upload;
  const { id } = await storeUpload(stream, mimetype);
  return id;
};

export const resolvers: IResolvers = {
  Mutation: {
    createBaby: async (_, args, { prisma, res, req }) => {
      const dob = dayjs(args.input.dob).format("YYYY-MM-DD");

      const pictureUrl = await processUpload(args.input.picture);

      const query = `
        mutation createBaby($name: String!, $dob: DateTime!, $userId: ID!, $pictureUrl: String!, $gender: GenderEnum!) {
          createBaby(data: {
            name: $name,
            dob: $dob,
            pictureUrl: $pictureUrl,
            gender: $gender
            parent: {
              connect: {
                id: $userId
              }
            }
          }) {
            name
            dob
            id
            pictureUrl
            gender
          }
        }

      `;

      const baby = await prisma.$graphql(query, {
        name: args.input.name,
        dob,
        userId: req.userId,
        pictureUrl,
        gender: args.input.gender
      });

      if (!baby) {
        return null;
      }

      return baby;
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

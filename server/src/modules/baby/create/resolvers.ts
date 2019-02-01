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
      const pictureUrl = await processUpload(args.input.picture);
      console.log(pictureUrl);
      console.log(args.input.name);

      // const query = `
      //   mutation createBaby($name: String!, $dob: DateTime!, $userId: ID!) {
      //     createBaby(data: {
      //       name: $name,
      //       dob: $dob,
      //       parent: {
      //         connect: {
      //           id: $userId
      //         }
      //       }
      //     }) {
      //       name
      //       dob
      //     }
      //   }

      // `;

      // const baby = await prisma.$graphql(query, {
      //   name: args.input.name,
      //   dob: args.input.dob,
      //   userId: req.userId
      // });

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

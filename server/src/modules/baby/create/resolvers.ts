import dayjs from "dayjs";
import { createWriteStream } from "fs";
import * as shortid from "shortid";
import { GraphQLScalarType, Kind } from "graphql";
import { IResolvers } from "apollo-server";
import { Context } from "../../../types";

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

export const resolvers: IResolvers<any, Context> = {
  Mutation: {
    createBaby: async (_, args, { prisma, res, req }) => {
      const dob = dayjs(args.input.dob).format("YYYY-MM-DD");

      const pictureUrl = await processUpload(args.input.picture);

      const baby = await prisma.createBaby({
        name: args.input.name,
        dob,
        pictureUrl,
        gender: args.input.gender,
        parent: {
          connect: {
            id: req.userId
          }
        }
      });

      return baby;
    }
  }
};

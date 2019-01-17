import { ApolloServer, gql } from "apollo-server";
import { genSchema } from "./utils/genSchema";
import { ServerResReq } from "./types";
import { Prisma } from "../generated/prisma-client";
import express from "express";
import cookieParser from "cookie-parser";

const prisma = new Prisma({
  endpoint: "http://localhost:4466/"
});

const { typeDefs, resolvers } = genSchema();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }: ServerResReq) => ({
    req,
    res,
    prisma
  })
});

const app = express();

app.use("*", cookieParser());

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

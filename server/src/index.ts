import { ApolloServer } from "apollo-server-express";
import { genSchema } from "./utils/genSchema";
import { ServerResReq } from "./types";
import { Prisma } from "../generated/prisma-client";
import express from "express";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import { Request } from "express-serve-static-core";

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

app.use(cookieParser());

app.use((req: any, res, next) => {
  const { token } = req.cookies;

  if (token) {
    const decodedToken: any = jwt.verify(token, "randomtokenapp");
    req.userId = decodedToken.userId;
  }
  next();
});

// app.use(async (req: any, res, next) => {
//   if (req.user) {
//     next();
//   }

//   if (req.userId) {
//     const user = await prisma.user({
//       id: req.userId
//     });

//     const { password, ...userInfo } = user;

//     req.user = userInfo;
//   }

//   next();
// });

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () => {
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
});

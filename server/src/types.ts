import { Prisma } from "../generated/prisma-client";
import { Response, Request } from "express-serve-static-core";

export interface ServerResReq {
  req: Request;
  res: Response;
}

export interface Context extends ServerResReq {
  url: string;
  prisma: Prisma;
}

export type Resolver = (
  parent: any,
  args: any,
  context: Context,
  info: any
) => any;

export interface ResolverMap {
  [key: string]: {
    [key: string]: Resolver;
  };
}

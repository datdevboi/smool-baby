import { Prisma } from "../generated/prisma-client";

export interface ServerResReq {
  req: Express.Request;
  res: Express.Response;
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

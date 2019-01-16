export interface ServerResReq {
  req: Express.Request;
  res: Express.Response;
}

export interface Context extends ServerResReq {
  url: string;
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

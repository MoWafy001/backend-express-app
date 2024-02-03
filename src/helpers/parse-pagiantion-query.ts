import { Request } from "express";

export const parsePaginationQuery = (query: Request["query"]) => {
  const take = query.take && parseInt(query.take as string);
  const skip = query.skip && parseInt(query.skip as string);

  return {
    take,
    skip,
  };
};

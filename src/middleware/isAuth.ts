import { MiddlewareFn } from "type-graphql";
import { AuthenticationError } from "apollo-server-express";
import { MyContext } from "../types/MyContext";

export const isAuth: MiddlewareFn<MyContext> = async (
  { context }: { context: MyContext },
  next
) => {
  if (!context.req.session!.userId) {
    throw new AuthenticationError("not authenticated");
  }
  return next();
};

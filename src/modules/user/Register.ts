import { Resolver, Query, Mutation, Arg, UseMiddleware } from "type-graphql";
import bcrypt from "bcryptjs";
import User from "../../models/User";
import { RegisterInput } from "./register/input";
import { isAuth } from "../../middleware/isAuth";
import { logger } from "../../middleware/logger";

@Resolver()
export class RegisterResolver {
  @UseMiddleware(isAuth, logger)
  @Query(() => String)
  hello() {
    return "Hello World";
  }

  @Mutation(() => User)
  async register(@Arg("data") data: RegisterInput): Promise<User> {
    const hashedPassword = await bcrypt.hash(data.password, 12);

    const user = await User.create({
      ...data,
      password: hashedPassword,
    });

    return user;
  }
}

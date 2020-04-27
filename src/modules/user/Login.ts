import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import User from "../../models/User";
import { LoginInput } from "./login/input";
import bcrypt from "bcryptjs";
import { MyContext } from "../../types/MyContext";

@Resolver()
export class LoginResolver {
  @Mutation(() => User, { nullable: true })
  async login(
    @Arg("data") data: LoginInput,
    @Ctx() ctx: MyContext
  ): Promise<User | null> {
    const user = await User.findOne({ where: { email: data.email } });

    if (!user) return null;

    const valid = await bcrypt.compare(data.password, user.password);

    if (!valid) return null;

    ctx.req.session!.userId = user.id;

    return user;
  }
}

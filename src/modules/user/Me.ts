import { Resolver, Ctx, Query } from "type-graphql";
import User from "../../models/User";
import { MyContext } from "../../types/MyContext";

@Resolver()
export class MeResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() ctx: MyContext): Promise<User | null> {
    const { userId } = ctx.req.session!;

    if (!userId) {
      return null;
    }

    return User.findByPk(userId);
  }
}

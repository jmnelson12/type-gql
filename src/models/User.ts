import { ObjectType, Field, ID, Root } from "type-graphql";
import {
  Table,
  Column,
  PrimaryKey,
  Model,
  Length,
  IsEmail,
} from "sequelize-typescript";
import { IsEmailUnique } from "../modules/user/register/IsEmailUnique";

@ObjectType()
@Table
export default class User extends Model<User> {
  @PrimaryKey
  @Column({ autoIncrementIdentity: true })
  @Field(() => ID)
  public readonly id: number;

  @Length({
    min: 1,
    max: 255,
    msg: "first name must be between 1 and 255 characters",
  })
  @Column
  @Field()
  public firstName: string;

  @Length({
    min: 1,
    max: 255,
    msg: "last name must be between 1 and 255 characters",
  })
  @Column
  @Field()
  public lastName: string;

  @IsEmailUnique({ message: "email already in use" })
  @IsEmail
  @Column({ unique: true, type: "text" })
  @Field()
  public email: string;

  @Field()
  public name(@Root() parent: User): string {
    return `${parent.firstName} ${parent.lastName}`;
  }

  @Column
  password: string;
}

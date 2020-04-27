import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { buildSchema } from "type-graphql";
import database from "./configs/orm";
import session from "express-session";
import connectRedis from "connect-redis";
import redis from "./configs/redis";
import cors from "cors";

import { RegisterResolver } from "./modules/user/Register";
import { LoginResolver } from "./modules/user/Login";
import { MeResolver } from "./modules/user/Me";
import { CreateUserResolver } from "./modules/user/CreateUser";

const main = async () => {
  try {
    const schema = await buildSchema({
      resolvers: [
        RegisterResolver,
        LoginResolver,
        MeResolver,
        CreateUserResolver,
      ],
    });
    const apolloServer = new ApolloServer({
      schema,
      context: ({ req }: any) => ({
        req,
      }),
    });

    const app = express();
    const RedisStore = connectRedis(session);

    app.use(
      cors({
        credentials: true,
        origin: "http://localhost:3000",
      })
    );

    // Express session middleware
    app.use(
      session({
        store: new RedisStore({
          client: redis as any,
        }),
        name: "qid",
        secret: "secret",
        resave: false,
        saveUninitialized: false,
        cookie: {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 1000 * 60 * 60 * 24 * 1 * 365, // 1 year
        },
      })
    );

    apolloServer.applyMiddleware({ app });

    app.listen(4000, () => console.log(`running on port: 4000`));
  } catch (err) {
    console.log({ err });
    process.exit(1);
  }
};

database.authenticate().then(() => {
  main();
});

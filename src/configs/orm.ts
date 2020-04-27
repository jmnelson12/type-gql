import { Sequelize } from "sequelize-typescript";
import * as path from "path";

const sequelize = new Sequelize({
  database: "typegraphql-example",
  dialect: "postgres",
  username: "postgres",
  password: "password",
  logging: console.log,
  models: [path.join(__dirname, "../models")],
  port: 5432,
  sync: {
    logging: console.log,
  },
  omitNull: true,
});

export default sequelize;

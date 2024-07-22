import { MySqlDialect } from "@sequelize/mysql";
import config from ".";

const { Sequelize, Transaction } = require("sequelize");

const uri = config.DB_CONNECTION || ""; // `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

const sequelize = new Sequelize(uri, {
  dialect: MySqlDialect,
  isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
  pool: {
    max: 100,
    acquire: 500000,
    idle: 10000,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Database Connection has been established successfully.");
  })
  .catch((error: any) => {
    console.error("Unable to connect to the database: ", error);
  });

export default sequelize;

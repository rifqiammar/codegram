import { Sequelize } from "sequelize";

const db = new Sequelize("codegram", "postgres", "root", {
  host: "localhost",
  dialect: "postgres",
});

export default db;

import { Sequelize } from "sequelize";
import db from "../config/Database.js";
// import Users from "./UsersModel.js";

const { DataTypes } = Sequelize;

const Posts = db.define(
  "posts",
  {
    caption: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    img_content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Posts;

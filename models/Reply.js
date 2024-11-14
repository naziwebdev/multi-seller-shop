const { db } = require("../db");
const { DataTypes } = require("sequelize");

//user_id & comment_id & parentReply are  relations column
const Reply = (sequelize) => {
  return sequelize.define(
    "Reply",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "replies",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
};

module.exports = Reply;

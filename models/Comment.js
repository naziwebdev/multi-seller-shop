const { DataTypes } = require("sequelize");

//user_id && product_id are relations columns
const Comment = (sequelize) => {
  return sequelize.define(
    "Comment",
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
      rating: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        validate: {
          min: 1,
          max: 5,
        },
      },
    },
    {
      tableName: "comments",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
};

module.exports = Comment;

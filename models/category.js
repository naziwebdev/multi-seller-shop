const { DataTypes } = require("sequelize");


//parent_id have a self-refrence relation to category

const Category = (sequelize) => {
  return sequelize.define(
    "Category",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.STRING,
      },
      icon: {
        type: DataTypes.JSON,
        allowNull: false,
        isValidIcon(value) {
          if (!value.filename || typeof value.filename !== "object") {
            throw new Error("filename is required and must be a object");
          }
          if (!value.pathname || typeof value.pathname !== "object") {
            throw new Error("pathname is required and must be a object");
          }
        },
      },
    },
    {
      tableName: "categories",
      timestamps: false,
    }
  );
};

module.exports = Category;

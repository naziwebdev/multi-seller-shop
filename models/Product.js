const { DataTypes } = require("sequelize");
const { db } = require("../db");

// subategory_id  is relations column

const Product = (sequelize) => {
  return db.define(
    "Product",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
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
        allowNull: false,
      },
      images: {
        type: DataTypes.JSON,
        allowNull: false,
        validate: {
          isArrayImages(value) {
            if (!Array.isArray(value)) {
              throw new Error("images must be an array");
            }
            value.forEach((image) => {
              if (typeof image !== "string") {
                throw new Error("image must be string");
              }
            });
          },
        },
      },
      filtersValue: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      customFilters: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      shortIdentifier: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      tableName: "products",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
};

module.exports = Product;

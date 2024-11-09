const { DataTypes } = require("sequelize");
const { db } = require("../db");

//user_id dont put in model and have relation
const Seller = (sequelize) => {
  return db.define(
    "Seller",
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
      contactDetails: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: {},
        validate: {
          notEmpty: true,
          isValidContactDetails(value) {
            if (!value.phone) {
              throw new Error("Phone number is required in contactDetails");
            }
          },
        },
      },
      cityId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
    },
    {
      tableName: "sellers",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
};

module.exports = Seller;

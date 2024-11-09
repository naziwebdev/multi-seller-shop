const { DataTypes } = require("sequelize");

//user_id  have relation and dont put in model

const Address = (sequelize) => {
  return sequelize.define(
    "Address",
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
      postalCode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      location: {
        type: DataTypes.JSON, // store a object
        allowNull: false,
        validate: {
          isValidLocation(value) {
            if (!value.lat || typeof value.lat !== "number") {
              throw new Error(
                "Latitude (lat) is required and must be a number"
              );
            }
            if (!value.lng || typeof value.lng !== "number") {
              throw new Error(
                "Longitude (lng) is required and must be a number"
              );
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
      tableName: "addresses",
      timestamps: false,
    }
  );
};

module.exports = Address;

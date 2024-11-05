const { DataTypes } = require("sequelize");

//user_id & city_id have relation and dont put in model

const Address = (sequelize) => {
  return sequelize.define(
    "address",
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
        type: DataTypes.JSONB, // store a object
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
    },
    {
      tableName: "addresses",
    }
  );
};

module.exports = Address;

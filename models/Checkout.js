const { DataTypes } = require("sequelize");

//user_id => relation column
const Checkout = (sequelize) => {
  return sequelize.define(
    "Checkout",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      shippingAddress: {
        type: DataTypes.JSON,
        allowNull: false,
        validate: {
          isValidAddress(value) {
            if (
              !value.postalCode ||
              !value.location ||
              !value.location.lat ||
              !value.location.lng ||
              !value.address ||
              !value.cityId
            ) {
              throw new Error("invalid shipping address");
            }
          },
        },
      },
      authority: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      tableName: "checkouts",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
};

module.exports = Checkout;

const { DataTypes } = require("sequelize");

//user_id => relation column
const Order = (sequelize) => {
  return sequelize.define(
    "Order",
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
      postTrackingCode: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.ENUM("processing", "shipped", "delivered"),
        defaultValue: "processing",
      },
    },
    {
      tableName: "orders",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      getterMethods: {
        totalPrice() {
          return this.items.reduce((total, item) => {
            return total + item.priceAtTimeOfPurchase * item.quantity;
          }, 0);
        },
      },
    }
  );
};

module.exports = Order;

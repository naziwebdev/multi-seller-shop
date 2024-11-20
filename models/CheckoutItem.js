const { DataTypes } = require("sequelize");

//product_id & seller_id & checkout_id => relations column
const CheckoutItem = (sequelize) => {
  return sequelize.define(
    "CheckoutItem",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
        },
      },
      priceAtTimeOfPurchase: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      tableName: "checkout_items",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
};

module.exports = CheckoutItem;

const { DataTypes } = require("sequelize");

//product_id & seller_id & cart_id => relations column
const CartItem = (sequelize) => {
  return sequelize.define(
    "CartItem",
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
      priceAtTimeOfAdding: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      tableName: "cart_items",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
};

module.exports = CartItem;

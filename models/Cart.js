const { DataTypes } = require("sequelize");

//user_id & cartItem_id (as items) => column relations

const Cart = (sequelize) => {
  return sequelize.define(
    "Cart",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
    },
    {
      tableName: "carts",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      getterMethods: {
        totalPrice() {
          return this.items.reduce((total, item) => {
            return total + item.priceAtTimeOfAdding * item.quantity;
          }, 0);
        },
      },
    }
  );
};

module.exports = Cart;

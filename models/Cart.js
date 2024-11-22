const { DataTypes } = require("sequelize");

//user_id  => column relations

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
    }
  );
};

module.exports = Cart;

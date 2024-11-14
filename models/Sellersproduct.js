const { DataTypes } = require("sequelize");

//seller_id & product_id are relations many-to-many betweeen seller & product model
//and create a seperate table (sellersproduct) for many-to-many relations

const SellersProduct = (sequelize) => {
  return sequelize.define(
    "SellersProduct",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      price: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      stock: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
    },
    {
      tableName: "sellers_product",
      timestamps: false,
    }
  );
};

module.exports = SellersProduct;

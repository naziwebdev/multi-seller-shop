const { DataTypes } = require("sequelize");

//seller_id & product_id are relations column
const SellerRequest = (sequelize) => {
  return sequelize.define(
    "SellerRequest",
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
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("pendding", "rejected", "accepted"),
        defaultValue: "pendding",
      },
      adminComment: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "seller_requests",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
};

module.exports = SellerRequest;

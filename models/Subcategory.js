const { DataTypes } = require("sequelize");


//parent_id have a relation to category

const SubCategory = (sequelize) => {
  return sequelize.define(
    "SubCategory",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "sub_categories",
      timestamps: false,
    }
  );
};

module.exports = SubCategory;

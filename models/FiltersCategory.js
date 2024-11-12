const { DataTypes } = require("sequelize");

const FiltersCategory = (sequelize) => {
  return sequelize.define(
    "FiltersCategory",
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
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.STRING,
      },
      type: {
        type: DataTypes.ENUM("radio", "selectbox"),
        allowNull: false,
      },
      options: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: undefined,
        validate: {
          isArrayOptions(value) {
            if (!Array.isArray(value)) {
              throw new Error("Options must be an array");
            }
          },
        },
      },
      min: {
        type: DataTypes.INTEGER,
      },
      max: {
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: "filters_categories",
      timestamps: false,
      validate: {
        atLeastOneRequired() {
          if (!this.category_id && !this.subCategory_id) {
            throw new Error(
              "Either categoryId or subCategoryId must be provided."
            );
          }
        },
      },
    }
  );
};

module.exports = FiltersCategory;

"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("fitlters_categories", {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      slug: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: Sequelize.STRING,
      },
      type: {
        type: Sequelize.ENUM("radio", "selectbox"),
        allowNull: false,
      },
      options: {
        type: Sequelize.JSON,
        allowNull: true,
        defaultValue: undefined,
      },
      min: {
        type: Sequelize.INTEGER,
      },
      max: {
        type: Sequelize.INTEGER,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("fitlters_categories");
  },
};

"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("orders", {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      shippingAddress: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      authority: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      postTrackingCode: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.ENUM("processing", "shipped", "delivered"),
        defaultValue: "processing",
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("orders");
  },
};

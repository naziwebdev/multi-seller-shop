'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cart_items', {
      id: {
        type:Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
        },
      },
      priceAtTimeOfAdding: {
        type: Sequelize.FLOAT,
        allowNull: false,
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
    await queryInterface.dropTable('cart_items');
  }
};
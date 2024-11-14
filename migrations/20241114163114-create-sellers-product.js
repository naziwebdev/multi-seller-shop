'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('sellers_product', {
      id: {
        type:Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      price: {
        type:Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      stock: {
        type:Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('sellers_product');
  }
};
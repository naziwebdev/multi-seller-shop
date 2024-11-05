"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("dddresses", {
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
      postalCode: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      location: {
        type: Sequelize.JSONB, // store a object
        allowNull: false,
        validate: {
          isValidLocation(value) {
            if (!value.lat || typeof value.lat !== "number") {
              throw new Error(
                "Latitude (lat) is required and must be a number"
              );
            }
            if (!value.lng || typeof value.lng !== "number") {
              throw new Error(
                "Longitude (lng) is required and must be a number"
              );
            }
          },
        },
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("dddresses");
  },
};

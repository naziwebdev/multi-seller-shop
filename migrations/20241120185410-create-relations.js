"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.addColumn("addresses", "user_id", {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
      });

      await queryInterface.addColumn("sellers", "user_id", {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
      });

      await queryInterface.addColumn("categories", "parent_id", {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true,
        references: {
          model: "categories",
          key: "id",
        },
        onDelete: "CASCADE",
      });

      await queryInterface.addColumn("sub_categories", "parent_id", {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "categories",
          key: "id",
        },
        onDelete: "CASCADE",
      });

      await queryInterface.addColumn("filters_categories", "category_id", {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true,
        references: {
          model: "categories",
          key: "id",
        },
        onDelete: "CASCADE",
      });

      await queryInterface.addColumn("filters_categories", "subCategory_id", {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true,
        references: {
          model: "sub_categories",
          key: "id",
        },
        onDelete: "CASCADE",
      });

      await queryInterface.addColumn("sellers_product", "seller_id", {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "sellers",
          key: "id",
        },
        onDelete: "CASCADE",
      });

      await queryInterface.addColumn("sellers_product", "product_id", {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "products",
          key: "id",
        },
        onDelete: "CASCADE",
      });

      await queryInterface.addColumn("products", "subCategory_id", {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "sub_categories",
          key: "id",
        },
        onDelete: "CASCADE",
      });

      await queryInterface.addColumn("seller_requests", "seller_id", {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "sellers",
          key: "id",
        },
        onDelete: "CASCADE",
      });

      await queryInterface.addColumn("seller_requests", "product_id", {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "products",
          key: "id",
        },
        onDelete: "CASCADE",
      });

      await queryInterface.addColumn("comments", "user_id", {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
      });
      await queryInterface.addColumn("comments", "product_id", {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "products",
          key: "id",
        },
        onDelete: "CASCADE",
      });

      await queryInterface.addColumn("replies", "user_id", {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
      });

      await queryInterface.addColumn("replies", "comment_id", {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "comments",
          key: "id",
        },
        onDelete: "CASCADE",
      });

      await queryInterface.addColumn("replies", "parentReply_id", {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true,
        references: {
          model: "replies",
          key: "id",
        },
        onDelete: "CASCADE",
      });

      await queryInterface.addColumn("carts", "user_id", {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
      });

      await queryInterface.addColumn("cart_items", "product_id", {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "products",
          key: "id",
        },
        onDelete: "CASCADE",
      });

      await queryInterface.addColumn("cart_items", "seller_id", {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "sellers",
          key: "id",
        },
        onDelete: "CASCADE",
      });

      await queryInterface.addColumn("cart_items", "cart_id", {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "carts",
          key: "id",
        },
        onDelete: "CASCADE",
      });

      await queryInterface.addColumn("checkouts", "user_id", {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
      });

      await queryInterface.addColumn("checkout_items", "product_id", {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "products",
          key: "id",
        },
        onDelete: "CASCADE",
      });

      await queryInterface.addColumn("checkout_items", "seller_id", {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "sellers",
          key: "id",
        },
        onDelete: "CASCADE",
      });

      await queryInterface.addColumn("checkout_items", "checkout_id", {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "checkouts",
          key: "id",
        },
        onDelete: "CASCADE",
      });

      ////
      await queryInterface.addColumn("orders", "user_id", {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
      });

      await queryInterface.addColumn("order_items", "product_id", {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "products",
          key: "id",
        },
        onDelete: "CASCADE",
      });

      await queryInterface.addColumn("order_items", "seller_id", {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "sellers",
          key: "id",
        },
        onDelete: "CASCADE",
      });

      await queryInterface.addColumn("order_items", "order_id", {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "orders",
          key: "id",
        },
        onDelete: "CASCADE",
      });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.removeColumn("addresses", "user_id");
      await queryInterface.removeColumn("sellers", "user_id");
      await queryInterface.removeColumn("categories", "parent_id");
      await queryInterface.removeColumn("sub_categories", "parent_id");
      await queryInterface.removeColumn("filters_categories", "category_id");
      await queryInterface.removeColumn("filters_categories", "subCategory_id");
      await queryInterface.removeColumn("sellers_product", "seller_id");
      await queryInterface.removeColumn("sellers_product", "product_id");
      await queryInterface.removeColumn("products", "subCategory_id");
      await queryInterface.removeColumn("seller_requests", "seller_id");
      await queryInterface.removeColumn("seller_requests", "product_id");
      await queryInterface.removeColumn("comments", "user_id");
      await queryInterface.removeColumn("comments", "product_id");
      await queryInterface.removeColumn("replies", "user_id");
      await queryInterface.removeColumn("replies", "comment_id");
      await queryInterface.removeColumn("replies", "parentReply_id");
      await queryInterface.removeColumn("carts", "user_id");
      await queryInterface.removeColumn("cart_items", "product_id");
      await queryInterface.removeColumn("cart_items", "seller_id");
      await queryInterface.removeColumn("cart_items", "cart_id");
      await queryInterface.removeColumn("checkouts", "user_id");
      await queryInterface.removeColumn("checkout_items", "product_id");
      await queryInterface.removeColumn("checkout_items", "seller_id");
      await queryInterface.removeColumn("checkout_items", "checkout_id");
      await queryInterface.removeColumn("orders", "user_id");
      await queryInterface.removeColumn("order_items", "product_id");
      await queryInterface.removeColumn("order_items", "seller_id");
      await queryInterface.removeColumn("order_items", "order_id");

      await transaction.commit();
    } catch (error) {
      throw error;
    }

    await queryInterface.dropTable("relations");
  },
};

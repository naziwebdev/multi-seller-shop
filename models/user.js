const { DataTypes } = require("sequelize");

const User = (sequelize) => {
  return sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      role: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: ["user"],
        validate: {
          isValidRoleArray(value) {
            const validRoles = ["admin", "user", "seller"];
            value.forEach((role) => {
              if (!validRoles.includes(role)) {
                throw new Error(`Invalid role: ${role}`);
              }
            });
          },
        },
      },
    },
    {
      tableName: "users",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
};

module.exports = User;

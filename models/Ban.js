const { DataTypes } = require("sequelize");

//in models if dont put timestaps :false sequelize generate it automoticlly and we get err

const Ban = (sequelize) => {
  return sequelize.define(
    "Ban",
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
      },
    },
    { tableName: "bans", timestamps: false }
  );
};

module.exports = Ban;

"use strict";

const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Token extends Model {
    static associate(models) {
      Token.belongsTo(models.User, {
        as: "owner",
        foreignKey: "user_id",
        onDelete: "CASCADE",
      });
    }
  }

  Token.init(
    {
      user_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
      },
      refresh_token: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Token",
      tableName: "tokens",
      underscored: true,
      timestamps: false,
    }
  );

  return Token;
};

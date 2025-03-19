"use strict";

const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Token extends Model {}

  Token.init(
    {
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      refresh_token: {
        type: DataTypes.STRING,
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

  Token.belongsTo(sequelize.models.User, {
    as: "owner",
    foreignKey: "user_id",
  });

  return Token;
};

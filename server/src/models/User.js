"use strict";

const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Application, {
        foreignKey: "user_id",
        as: "applications",
      });
      User.hasMany(models.Notification, {
        foreignKey: "user_id",
        as: "notifications",
      });
      User.hasMany(models.Token, {
        foreignKey: "user_id",
        as: "tokens",
      });
    }
  }

  User.init(
    {
      user_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM("applicant", "reviewer", "admin"),
        allowNull: false,
        defaultValue: "applicant",
      },
      status: {
        type: DataTypes.ENUM("pending", "verified", "blocked"),
        allowNull: false,
        defaultValue: "pending",
      },
      verification_token: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      timestamps: false,
    }
  );

  return User;
};

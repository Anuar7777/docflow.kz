"use strict";

const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Application extends Model {
    static associate(models) {
      Application.belongsTo(models.User, {
        as: "creator",
        foreignKey: "user_id",
      });

      Application.belongsTo(models.User, {
        as: "reviewer",
        foreignKey: "reviewer_id",
      });
    }
  }

  Application.init(
    {
      application_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("saved", "pending", "accepted", "rejected"),
        allowNull: false,
        defaultValue: "saved",
      },
      data: {
        type: DataTypes.JSONB,
        allowNull: false,
      },
      comment: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      reviewer_id: {
        type: DataTypes.UUID,
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
      modelName: "Application",
      tableName: "applications",
      timestamps: false,
    }
  );

  return Application;
};

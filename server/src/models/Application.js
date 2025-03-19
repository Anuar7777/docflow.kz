"use strict";

const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Application extends Model {}

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

  Application.belongsTo(sequelize.models.User, {
    as: "creator",
    foreignKey: "user_id",
  });

  Application.belongsTo(sequelize.models.User, {
    as: "reviewer",
    foreignKey: "reviewer_id",
  });

  return Application;
};

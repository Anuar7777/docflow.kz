"use strict";

const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Notification extends Model {}

  Notification.init(
    {
      notification_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("unread", "read"),
        allowNull: false,
        defaultValue: "unread",
      },
      created_by: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Notification",
      tableName: "notifications",
      timestamps: false,
    }
  );

  Notification.belongsTo(sequelize.models.User, {
    as: "recipient",
    foreignKey: "user_id",
  });

  Notification.belongsTo(sequelize.models.User, {
    as: "creator",
    foreignKey: "created_by",
  });

  return Notification;
};

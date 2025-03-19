"use strict";

const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class ApplicationForm extends Model {}

  ApplicationForm.init(
    {
      form_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      schema: {
        type: DataTypes.JSONB,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("draft", "published"),
        allowNull: false,
        defaultValue: "draft",
      },
      created_by: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      updated_by: {
        type: DataTypes.UUID,
        allowNull: false,
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
      modelName: "ApplicationForm",
      tableName: "application_forms",
      timestamps: false,
    }
  );

  ApplicationForm.belongsTo(sequelize.models.User, {
    as: "creator",
    foreignKey: "created_by",
  });

  ApplicationForm.belongsTo(sequelize.models.User, {
    as: "editor",
    foreignKey: "updated_by",
  });

  return ApplicationForm;
};

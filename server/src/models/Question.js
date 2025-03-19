"use strict";

const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Question extends Model {}

  Question.init(
    {
      question_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      question: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      answer: {
        type: DataTypes.TEXT,
        allowNull: true,
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
      modelName: "Question",
      tableName: "questions",
      timestamps: false,
    }
  );

  Question.belongsTo(sequelize.models.User, {
    as: "creator",
    foreignKey: "created_by",
  });

  Question.belongsTo(sequelize.models.User, {
    as: "editor",
    foreignKey: "updated_by",
  });

  return Question;
};

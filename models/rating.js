"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Rating extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Rating.belongsTo(models.Lesson, {
        foreignKey: "lesson_id",
        as: "lesson",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        targetKey: "id",
      });
      Rating.belongsTo(models.Lecturer, {
        foreignKey: "nidn",
        targetKey: "nidn",
        as: "lecturer",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Rating.belongsTo(models.Student, {
        foreignKey: "nim",
        as: "student",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        targetKey: "nim",
      });
    }
  }
  Rating.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      lesson_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      nidn: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      nim: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      star: {
        type: DataTypes.DOUBLE(2, 2),
        allowNull: false,
      },
      comment: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Rating",
    }
  );
  return Rating;
};

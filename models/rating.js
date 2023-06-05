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
      });
      Rating.belongsTo(models.User, {
        foreignKey: "nidn",
        as: "lecturer",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Rating.belongsTo(models.Student, {
        foreignKey: "nim",
        as: "student",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
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
        type: DataTypes.INTEGER(20),
        allowNull: false,
      },
      nim: {
        type: DataTypes.INTEGER(20),
        allowNull: false,
      },
      rating: {
        type: DataTypes.INTEGER(2),
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

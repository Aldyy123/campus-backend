const { Model, Sequelize } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Lesson extends Model {
    static associate (models) {
      Lesson.hasMany(models.Schedule, {
        foreignKey: 'lesson_id',
        as: 'schedule',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    }
  }
  Lesson.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Lesson'
    }
  )
  return Lesson
}

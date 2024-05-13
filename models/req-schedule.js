const { Model, Sequelize } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class ReqSchedule extends Model {
    static associate (models) {}
  }
  ReqSchedule.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      schedule_id: {
        type: DataTypes.UUID,
        allowNull: false
      },
      schedule_date: {
        type: DataTypes.DATE,
        allowNull: false
      },
      reason: {
        type: DataTypes.STRING,
        allowNull: false
      },
      nim: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      description: DataTypes.TEXT
    },
    {
      sequelize,
      modelName: 'ReqSchedule'
    }
  )
  return ReqSchedule
}

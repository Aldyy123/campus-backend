const { Model, Sequelize } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate (models) {
      User.hasOne(models.Student, {
        foreignKey: 'id',
        as: 'student',
        onDelete: 'cascade',
        onUpdate: 'cascade'
      })
      User.hasOne(models.Lecturer, {
        foreignKey: 'id',
        as: 'lecturer',
        onDelete: 'cascade',
        onUpdate: 'cascade'
      })
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          name: 'email',
          msg: 'Email sudah ada'
        },
        validate: {
          isEmail: true
        }
      },
      role: {
        type: DataTypes.ENUM('mahasiswa', 'dosen', 'admin'),
        defaultValue: 'mahasiswa',
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'User'
    }
  )
  return User
}

const {
    Model,
    Sequelize
} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class Student extends Model {
        static associate(models) {
            Student.hasMany(models.Lesson, {
                foreignKey: 'class',
                as: 'lesson',
            })
            Student.hasMany(models.User, {
                foreignKey: 'id',
                as: 'user',
            })
        }
    }
    Student.init({
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        nim: {
            type: DataTypes.STRING,
            unique: {
                name: 'nim',
                msg: 'Maaf NIM sudah ada'
            },
            allowNull: false,
        },
        class: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        extra: DataTypes.JSONB,
    }, {
        sequelize,
        modelName: 'Student',
    })
    return Student
}
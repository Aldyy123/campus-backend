const {
    Model,
    Sequelize
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Lesson extends Model {
        static associate(models) {
            Lesson.belongsTo(models.Lecturer, {
                foreignKey: 'nidn',
                as: 'lecturer',
            })
            Lesson.belongsTo(models.Student, {
                foreignKey: 'class',
                as: 'student',
            })
        }
    }
    Lesson.init({
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        schedule_lesson: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        sks_lesson: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        room_lesson: {
            type: DataTypes.CHAR,
            allowNull: false,
        },
        rechedule_date: DataTypes.DATE,
        description: DataTypes.TEXT,
        extra: DataTypes.JSONB,
    }, {
        sequelize,
        modelName: 'Lesson',
    })
    return Lesson
}
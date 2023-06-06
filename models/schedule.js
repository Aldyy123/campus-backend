const {
    Model,
    Sequelize
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Schedule extends Model {
        static associate(models) {
            Schedule.belongsTo(models.Lecturer, {
                foreignKey: 'nidn',
                as: 'lecturer',
                targetKey: 'nidn',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            })
            Schedule.belongsTo(models.Student, {
                foreignKey: 'classmate',
                as: 'student',
                keyType: DataTypes.CHAR(10),
                targetKey: 'classmate',
                constraints: false,
                foreignKeyConstraint: false,
            })
            Schedule.belongsTo(models.Lesson, {
                foreignKey: 'lesson_id',
                as: 'lesson',
            })
        }
    }
    Schedule.init({
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
        },
        lesson_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        schedule: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        sks: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        room: {
            type: DataTypes.STRING(2),
            allowNull: false,
        },
        nidn: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        rechedule_date: DataTypes.DATE,
        description: DataTypes.TEXT,
    }, {
        sequelize,
        modelName: 'Schedule',
    })
    return Schedule
}
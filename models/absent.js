const {Sequelize, Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Absent extends Model {
        static associate(models) {
            Absent.belongsTo(models.Student, {
                foreignKey: 'nim',
                as: 'student',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',                
                targetKey: 'nim'
            })
            Absent.belongsTo(models.Schedule, {
                foreignKey: 'schedule_id',
                as: 'schedule',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            })
        }
    }

    Absent.init({
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
        },
        status: {
            type: DataTypes.ENUM('present', 'absent'),
            allowNull: false
        },
        nim: {
            type: DataTypes.INTEGER(10),
            allowNull: false
        },
        schedule_id: {
            type: DataTypes.UUID,
            allowNull: false
        },
        reason: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Absent'
    })


    return Absent
}
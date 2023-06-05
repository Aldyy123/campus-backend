const {
    Model,
    Sequelize
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Lecturer extends Model {
        static associate(models) {
            // define association here
            Lecturer.belongsTo(models.User, {
                foreignKey: 'id',
                as: 'user',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            })

            Lecturer.hasMany(models.Schedule, {
                foreignKey: 'nidn',
                as: 'schedule',
                sourceKey: 'nidn',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            })
        }
    }
    Lecturer.init({
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        nidn: {
            type: DataTypes.INTEGER,
            unique: {
                name: 'nidn',
                msg: 'Maaf NIDN sudah ada'
            },
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'Lecturer',
    })
    return Lecturer
}
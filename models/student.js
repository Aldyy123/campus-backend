const {
    Model,
    Sequelize
} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class Student extends Model {
        static associate(models) {
            Student.belongsTo(models.User, {
                foreignKey: 'id',
                as: 'user',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
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
            type: DataTypes.INTEGER(20),
            unique: {
                name: 'nim',
                msg: 'Maaf NIM sudah ada'
            },
            allowNull: false,
        },
        classmate: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        major: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        start_year: {
            type: DataTypes.STRING(9),
            allowNull: false,
        },
        extra: DataTypes.JSONB,
    }, {
        sequelize,
        modelName: 'Student',
    })
    return Student
}
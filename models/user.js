const {
    Model,
    Sequelize
} = require('sequelize')

module.exports =  (sequelize, DataTypes) => {
    class User extends Model {
    }
    User.init({
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                name: 'email',
                msg: 'Email sudah ada'
            },
            validate: {
                isEmail: true,
            }
        },
        password: DataTypes.STRING,
        role: {
            type: DataTypes.ENUM('mahasiswa', 'dosen', 'admin'),
            defaultValue: 'mahasiswa',
            allowNull: false,
        },
        extra: DataTypes.JSONB,
    }, {
        sequelize,
        modelName: 'User',
    })
    return User
}
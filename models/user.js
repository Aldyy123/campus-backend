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
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        phone: DataTypes.STRING,
        role: DataTypes.STRING,
        extra: DataTypes.JSONB,
        token: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'User',
        hooks: {
            beforeCreate: function (ping, options, fn) {
                ping.createdAt = new Date()
                ping.updatedAt = new Date()
                // fn(null, ping);
            },
            beforeUpdate: function (ping, options, fn) {
                ping.updatedAt = new Date()
                // fn(null, ping);
            },
        },
    })
    return User
}
const {
    Sequelize,
    DataTypes
} = require('sequelize');
const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename)
const env = process.env.NODE_ENV || 'development'
const config = require('../config/config').DATABASE[env]

const db = {}
let sequelize

if (config.use_env_variable) {
    sequelize = new Sequelize(config.use_env_variable, config)
} else {
    sequelize = new Sequelize(
        config.database,
        config.username,
        config.password,
        config
    )
}


fs
    .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        const model = require(path.join(__dirname, file))(sequelize, DataTypes);
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db)
    }
})


db.sequelize = sequelize
db.Sequelize = Sequelize

db.sequelize.sync({
    // force: true
})

module.exports = db
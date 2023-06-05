const dotenv = require("dotenv");
dotenv.config();

const config = {
  development: {
    database: String(process.env.DEV_DATABASE_NAME),
    username: String(process.env.DEV_DATABASE_USERNAME),
    password: String(process.env.DEV_DATABASE_PASSWORD),
    host: String(process.env.DEV_DATABASE_HOST),
    dialect: "postgres",
  },
  production: {
    database: String(process.env.PROD_DATABASE_NAME),
    username: String(process.env.PROD_DATABASE_USERNAME),
    password: String(process.env.PROD_DATABASE_PASSWORD),
    host: String(process.env.PROD_DATABASE_HOST),
    dialect: "postgres",
    // host: '/cloudsql/campus-818f1:asia-southeast2:backend-campus',
    // dialectOptions: {
    //     socketPath: '/cloudsql/campus-818f1:asia-southeast2:backend-campus'
    // },
    // pool: {
    //     max: 5,
    //     min: 0,
    //     acquire: 30000,
    //     idle: 10000
    // },
  }
};

module.exports = config;

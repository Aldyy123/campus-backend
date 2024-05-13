const dotenv = require("dotenv");
dotenv.config();

const config = {
  development: {
    database: String(process.env.DB_NAME),
    username: String(process.env.DB_USER),
    password: String(process.env.DB_PASS),
    host: String(process.env.DB_HOST),
    dialect: "postgres",
  },
  production: {
    database: String(process.env.DB_NAME),
    username: String(process.env.DB_USER),
    password: String(process.env.DB_PASS),
    host: String(process.env.DB_HOST),
    dialect: "postgres",
  },
};

module.exports = config;

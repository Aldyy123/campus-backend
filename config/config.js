const dotenv = require("dotenv");
dotenv.config();

console.log("CHECKING ENVIRONMENT...");
if (!process.env["APPLICATION_PORT"]) {
  console.log(`APPLICATION_PORT not found.`);
  process.exit(1);
}
if (!process.env["DATABASE_HOST"]) {
  console.log(`DATABASE_HOST not found.`);
  process.exit(1);
}
if (!process.env["DATABASE_PORT"]) {
  console.log(`DATABASE_PORT not found.`);
  process.exit(1);
}
if (!process.env["DATABASE_NAME"]) {
  console.log(`DATABASE_NAME not found.`);
  process.exit(1);
}
if (!process.env["DATABASE_USERNAME"]) {
  console.log(`DATABASE_USERNAME not found.`);
  process.exit(1);
}
if (!process.env["DATABASE_PASSWORD"]) {
  console.log(`DATABASE_PASSWORD not found.`);
  process.exit(1);
}

const config = {
  development: {
    database: String(process.env.DATABASE_NAME),
    username: String(process.env.DATABASE_USERNAME),
    password: String(process.env.DATABASE_PASSWORD),
    host: String(process.env.DATABASE_HOST),
    dialect: "postgres",
  },
};

module.exports = config;

const { Sequelize } = require("sequelize");
require("dotenv").config();

const Connection = {
  dialect: "postgres",
  host: "localhost",
  port: "5432",
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};
const sequelize = new Sequelize(Connection);
sequelize.sync({ force: true });
console.log("All models were synchronized successfully.");
sequelize.query("CREATE EXTENSION IF NOT EXISTS pg_trgm", { raw: true });
module.exports = sequelize;

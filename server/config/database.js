const { Sequelize} = require("sequelize")
require("dotenv").config()

const Connection = {
    dialect: "postgres",
    host: "localhost",
    port: "5432",
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
}

module.exports = new Sequelize(Connection);
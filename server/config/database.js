const { Sequelize } = require("sequelize");
const setAssocations = require("../associations/setAssocations");
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
sequelize.sync({ alter: true });
console.log("All models were synchronized successfully.");
sequelize.query("CREATE EXTENSION IF NOT EXISTS pg_trgm", { raw: true });
// initialize db
models = [
  require("../models/Challenge"),
  require("../models/Challenge_collab"),
  require("../models/Collaborateur"),
  require("../models/Departement"),
  require("../models/Provider"),
  require("../models/Quota"),
  require("../models/Session"),
  require("../models/Session_Collab"),
  require("../models/Societe"),
  require("../models/SuperAdmin"),
  require("../models/Users"),
  require("../models/Cours"),
];
for (model of models) {
  console.log(model);
  model(sequelize);
}
// Set Associations
setAssocations(sequelize);
module.exports = sequelize;

const Sequelize = require("sequelize");
const db = require("../config/database");
const Quota = require("./Quota");
const Quota = require("./Quota");

const Cours = db.define("Cours", {
  // Model attributes are defined here
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  nom: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  provider: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});
Cours.hasMany(Quota);
Quota.hasOne(Cours);
module.exports = Cours;

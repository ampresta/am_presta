const Sequelize = require("sequelize");
const db = require("../config/database");
const Collaborateur = require("./Collaborateur");
const Departement = require("./Departement");
const Quota = require("./Quota");

const Societe = db.define("Societe", {
  // Model attributes are defined here
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  image: {
    type: Sequelize.STRING,
  },
});

Societe.hasMany(Departement);
Departement.belongsTo(Societe);

Societe.hasMany(Collaborateur);
Collaborateur.Societe = Collaborateur.belongsTo(Societe);

Societe.hasMany(Quota);
Quota.belongsTo(Societe);

module.exports = Societe;

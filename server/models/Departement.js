const Sequelize = require("sequelize");
const db = require("../config/database");
const Collaborateur = require("./Collaborateur");

const Departement = db.define("Departement", {
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
});

Departement.hasMany(Collaborateur);
Collaborateur.belongsTo(Departement);
module.exports = Departement;

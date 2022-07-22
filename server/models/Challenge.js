const Sequelize = require("sequelize");
const db = require("../config/database");
const Cours = require("Cours");
const Session = require("./Session");
const Departement = require("./Departement");
const Challenge = db.define("Challenge", {
  // Model attributes are defined here

  nom: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  datedebut: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  datefin: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  prix: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

Challenge.hasMany(Session);
Challenge.hasMany(Departement);

Session.belongsToMany(Challenge, { through: "Challenge_Session" });
Departement.belongsToMany(Challenge, { through: "Challenge_Dept" });

module.exports = Challenge;

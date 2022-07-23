const Sequelize = require("sequelize");
const db = require("../config/database");
const Cours = require("./Cours");
const Session = db.define("Session", {
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
  statut: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
});

Session.hasOne(Cours);
Cours.hasMany(Session);

module.exports = Session;

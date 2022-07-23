const Sequelize = require("sequelize");
const db = require("../config/database");
const Collaborateur = require("./Collaborateur");
const ChallengeCollab = db.define("Challenge", {
  // Model attributes are defined here

  statut: {
    type: Sequelize.BOOLEAN,
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
  coursefini: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

Challenge.hasMany(Collaborateur);

Collaborateur.belongsToMany(Challenge, { through: ChallengeCollab });

module.exports = Challenge;

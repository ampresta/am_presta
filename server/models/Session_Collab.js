const Sequelize = require("sequelize");
const db = require("../config/database");
const Collaborateur = require("./Collaborateur");
const Session = require("./Session");

const Session_Collab = db.define("Session_Collab", {
  // Model attributes are defined here

  proof_fin: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  proof_certif: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  date_fin: {
    type: Sequelize.DATE,
    allowNull: true,
  },
  score: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  statut: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
});

module.exports = Session_Collab;

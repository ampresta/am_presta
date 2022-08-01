const Sequelize = require("sequelize");
const db = require("../config/database");

const Collaborateur = db.define("Collaborateur", {
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
  prenom: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  image: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  admin: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  instructor: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
});
module.exports = Collaborateur;

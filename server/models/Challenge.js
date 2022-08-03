const Sequelize = require("sequelize");
const db = require("../config/database");
const Session = require("./Session");
const Departement = require("./Departement");
const Challenge = db.define(
  "Challenge",
  {
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
  },
  {
    Sequelize,
    paranoid: true,
  }
);

Challenge.belongsToMany(Session, { through: Challenge_Session });
Challenge.belongsToMany(Departement, { through: Challenge_Dept });

Session.belongsToMany(Challenge, { through: Challenge_Session });
Departement.belongsToMany(Challenge, { through: Challenge_Dept });

module.exports = Challenge;

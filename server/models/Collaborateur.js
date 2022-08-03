const Sequelize = require("sequelize");
const db = require("../config/database");
const Session = require("./Session");
const Session_Collab = require("./Session_Collab");

const Collaborateur = db.define(
  "Collaborateur",
  {
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
  },
  {
    Sequelize,
    paranoid: true,
  }
);
Session.belongsToMany(Collaborateur, {
  through: Session_Collab,
});
Collaborateur.belongsToMany(Session, {
  through: Session_Collab,
});
module.exports = Collaborateur;

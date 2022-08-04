const Sequelize = require("sequelize");

const Session_Collab = (db) => {
  db.define("Session_Collab", {
    // Model attributes are defined here

    proof_fin: {
      type: Sequelize.STRING,
    },
    proof_certif: {
      type: Sequelize.STRING,
    },
    date_fin: {
      type: Sequelize.DATE,
    },
    score: {
      type: Sequelize.INTEGER,
    },
    status: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  });
};
module.exports = Session_Collab;

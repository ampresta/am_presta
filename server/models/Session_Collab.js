const Sequelize = require("sequelize");

const Session_Collab = (db) => {
  db.define(
    "Session_Collab",
    {
      // Model attributes are defined here

      score: {
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    { Sequelize, paranoid: true }
  );
};
module.exports = Session_Collab;

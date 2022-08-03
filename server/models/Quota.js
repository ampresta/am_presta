const Sequelize = require("sequelize");
const db = require("../config/database");

const Quota = db.define(
  "Quota",
  {
    // Model attributes are defined here

    quota: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    Sequelize,
    paranoid: true,

    // If you want to give a custom name to the deletedAt column
    deletedAt: "destroyTime",
  }
);
//Quota.hasOne(Cours);
//Quota.hasOne(Societe);

module.exports = Quota;

const Sequelize = require("sequelize");
const db = require("../config/database");

const Quota = db.define("Quota", {
  // Model attributes are defined here

  quota: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});
//Quota.hasOne(Cours);
//Quota.hasOne(Societe);

module.exports = Quota;

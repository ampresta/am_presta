const Sequelize = require("sequelize");
const User = require("./Users");

const db = require("../config/database");
const SuperAdmin = db.define("SuperAdmin", {
  nom: {
    type: Sequelize.STRING,
  },
  prenom: {
    type: Sequelize.STRING,
  },
});
SuperAdmin.User = SuperAdmin.belongsTo(User);
User.SuperAdmin = User.hasOne(SuperAdmin);
module.exports = SuperAdmin;

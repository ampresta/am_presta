const Sequelize = require("sequelize");
const db = require("../config/database");
const Collaborateur = require("./Collaborateur");

const User = db.define("User", {
  // Model attributes are defined here
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false, // defaults to true
  },
});

User.hasOne(Collaborateur);
Collaborateur.belongsTo(User);
module.exports = User;

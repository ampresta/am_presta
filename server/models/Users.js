const Sequelize = require("sequelize");
const db = require("../config/database");
const Collaborateur = require("./Collaborateur");

const User = db.define(
  "User",
  {
    // Model attributes are defined here

    username: {
      unique: true,
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false, // defaults to true
    },
  },
  {
    Sequelize,
    paranoid: true,

    // If you want to give a custom name to the deletedAt column
    deletedAt: "destroyTime",
  }
);

User.Collaborateur = User.hasOne(Collaborateur);
Collaborateur.belongsTo(User);

module.exports = User;

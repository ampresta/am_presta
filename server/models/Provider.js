const { Sequelize } = require("sequelize");
const db = require("../config/database");
const Provider = db.define(
  "Provider",
  {
    nom: {
      type: Sequelize.STRING,
    },
    image: {
      type: Sequelize.STRING,
    },
  },
  {
    Sequelize,
    paranoid: true,
  }
);

module.exports = Provider;

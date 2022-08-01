const { Sequelize } = require("sequelize");
const db = require("../config/database");
const Cours = require("./Cours");
const Provider = db.define("Provider", {
  nom: {
    type: Sequelize.STRING,
  },
  image: {
    type: Sequelize.STRING,
  },
});
Provider.Cours = Provider.hasMany(Cours);
Cours.Provider = Cours.belongsTo(Provider);

module.exports = Provider;

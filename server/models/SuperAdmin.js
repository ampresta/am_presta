const Sequelize = require("sequelize");
const SuperAdmin = (db) => {
  db.define("SuperAdmin", {
    nom: {
      type: Sequelize.STRING,
    },
    prenom: {
      type: Sequelize.STRING,
    },
  });
};
module.exports = SuperAdmin;

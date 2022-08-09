const Sequelize = require("sequelize");
const Departement = (db) => {
  db.define(
    "Departement",
    {
      // Model attributes are defined here
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      nom: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ssss: {
        type: Sequelize.STRING,
      },
    },
    {
      Sequelize,
      paranoid: true,
      deletedAt: "deletedAt",
    }
  );
};
module.exports = Departement;

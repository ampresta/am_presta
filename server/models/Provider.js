const { Sequelize } = require("sequelize");
const Provider = (db) => {
  db.define(
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
      deletedAt: "deletedAt",
    }
  );
};
module.exports = Provider;

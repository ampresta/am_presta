const Sequelize = require("sequelize");

const Quota = (db) => {
  db.define(
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
      deletedAt: "deletedAt",
    }
  );
};

module.exports = Quota;

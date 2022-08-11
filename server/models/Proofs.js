const sequelize = require("sequelize");

const Proof = (db) => {
  db.define("Proof", {
    status: {
      type: sequelize.BOOLEAN,
    },
  });
};

module.exports = Proof;

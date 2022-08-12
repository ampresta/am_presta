const sequelize = require("sequelize");

const Proof = (db) => {
  db.define("Proof", {
    status: {
      type: sequelize.BOOLEAN,
    },
    file: {
      type: sequelize.STRING,
    },
  });
};

module.exports = Proof;

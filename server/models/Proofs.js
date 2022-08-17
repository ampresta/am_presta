const sequelize = require("sequelize");

const Proof = (db) => {
  db.define("Proof", {
    id: {
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    status: {
      type: sequelize.BOOLEAN,
    },
    file: {
      type: sequelize.STRING,
    },
    name: { type: sequelize.STRING },
    mimetype: { type: sequelize.STRING },
    size: { type: sequelize.INTEGER },
  });
};

module.exports = Proof;

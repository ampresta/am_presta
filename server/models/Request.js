const Sequelize = require("sequelize");
const Request = (db) => {
  db.define(
    "Request",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    },
    {
      Sequelize,
      paranoid: true,
    }
  );
};
module.exports = Request;

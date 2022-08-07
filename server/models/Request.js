const Sequelize = require("sequelize");
const Request = (db) => {
  db.define(
    "Request",
    {
      // Model attributes are defined here
    },
    {
      Sequelize,
      paranoid: true,
    }
  );
};
module.exports = Request;

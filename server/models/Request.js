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
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      Sequelize,
      paranoid: true,
      deletedAt: "deletedAt",
    }
  );
};
module.exports = Request;

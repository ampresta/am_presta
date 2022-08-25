const Sequelize = require("sequelize");
const Email = require("../emails/Email");
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
        type: Sequelize.STRING,
        defaultValue: "pending",
        validate: {
          inside: (value) => {
            const enums = ["accepted", "pending", "refused"];
            if (!enums.includes(value)) {
              throw new Error("not a valid option");
            }
          },
        },
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

const sequelize = require("sequelize");

const Proof = (db) => {
  db.define("Proof", {
    id: {
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    status: {
      type: sequelize.STRING,
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
    file: {
      type: sequelize.STRING,
    },
    name: { type: sequelize.STRING },
    mimetype: { type: sequelize.STRING },
    size: { type: sequelize.INTEGER },
  });
};

module.exports = Proof;

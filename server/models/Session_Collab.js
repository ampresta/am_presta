const Sequelize = require("sequelize");
const { fields } = require("./Collaborateur");

const Session_Collab = (db) => {
  db.define(
    "Session_Collab",
    {
      // Model attributes are defined here
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      status: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      Sequelize,
      paranoid: true,
      indexes: [
        {
          unique: true,
          fields: ["id"],
        },
      ],
    }
  );
};
module.exports = Session_Collab;

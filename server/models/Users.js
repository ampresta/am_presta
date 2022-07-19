const Sequelize = require("sequelize")
const db = require("../config/database");

module.exports = db.define("User", {
  // Model attributes are defined here
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,

  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
	  primaryKey:true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false // defaults to true
  },
});

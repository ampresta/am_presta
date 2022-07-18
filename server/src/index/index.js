const { Middleware } = require("./midllewares/midllewares");
const routes = require("./routes/routes");
require("./connection");
require("dotenv").config();
const { Sequelize } = require("sequelize");
const express = require("express");

(async () => {
  const app = express();

  //Database Setup
  const sequelize = new Sequelize(Connection);
  module.exports.sequelize = sequelize;
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
  // Middleware
  //: app.use(Middleware);

  const cors = require("cors");
  const morgan = require("morgan");
  app.use(cors());
  app.use(morgan("tiny"));
  app.use(express.json()); // for parsing application/json
  //app.use(express.urlencoded({ extended: true }));
  // Routing
  app.use(routes);
  // Listener
  app.listen(process.env.PORT, () =>
    console.log(`Server listening on ${process.env.PORT}...`)
  );
})();

const cors = require("cors");
const morgan = require("morgan");
const express = require("express");
const app = express();
const db = require("./config/database");
const login = require("./routes/login");
const register = require("./routes/register");
const societe = require("./routes/societe");
const dept = require("./routes/dept");
const cours = require("./routes/cours");

const PORT = process.env.PORT;
//Database Setup
try {
  db.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.log("Unable to connect to the database:");
}

// Middleware
app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
require("dotenv").config();

// Routing
app.use("/api/login", login);
app.use("/api/register", register);
app.use("/api/societe", societe);
app.use("/api/dept", dept);
<<<<<<< HEAD
app.use("/api/cours", cours);
=======

>>>>>>> d1083873c5cd8ae04aa708a66e1b349ecbda5bd3
// Listener
app.listen(PORT, () => console.log(`Server listening on ${PORT}...`));

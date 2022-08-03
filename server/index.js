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
const session = require("./routes/session");
const PORT = process.env.PORT;
const dashboard = require("./routes/dashboard");
const provider = require("./routes/provider");
const multer = require("multer");
const handleUpload = require("./controllers/upload/handleUpload");
const deleteInstances = require("./controllers/delete/deleteInstances");
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

// FILE STORAGE
const STORAGE = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./media");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});
const upload = multer({ storage: STORAGE });

// Routing
app.use("/api/login", login);
app.use("/api/register", register);
app.use("/api/societe", societe);
app.use("/api/dept", dept);
app.use("/api/session", session);
app.use("/api/cours", cours);
app.use("/api/dashboard", dashboard);
app.use("/api/provider", provider);

app.post("/api/upload", upload.single("image"), handleUpload);
app.post("/api/delete", deleteInstances);
// Listener
app.listen(PORT, () => console.log(`Server listening on ${PORT}...`));

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
const proof = require("./routes/proof");
const provider = require("./routes/provider");
const voucher = require("./routes/voucher");
const logout = require("./routes/logout");
const multer = require("multer");
const handleUpload = require("./controllers/upload/handleUpload");
const deleteInstances = require("./controllers/delete/deleteInstances");

const collaborateur = require("./routes/collaborateur");
const quota = require("./routes/quota");
const GetTypeController = require("./controllers/login/GetTypeController");
const Email = require("./emails/Email");
const changePhotoMiddleware = require("./middlewares/changePhotoMiddleware");
//Database Setup
try {
  db.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.log("Unable to connect to the database:");
}

// Middleware
// app.use(
//   cors({
//     origin: "http://127.0.0.1:3000",
//     credentials: true,
//   })
// );
app.use(cors({ credentials: true, origin: "http://127.0.0.1:3000" }));

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

app.get("/api/gettype", GetTypeController);
app.use("/api/login", login);
app.use("/api/register", register);
app.use("/api/societe", societe);
app.use("/api/dept", dept);
app.use("/api/quota", quota);
app.use("/api/session", session);
app.use("/api/cours", cours);
app.use("/api/dashboard", dashboard);
app.use("/api/provider", provider);
app.use("/api/collab", collaborateur);
app.use("/api/proof", proof);
app.use("/api/voucher", voucher);
app.use("/api/upload", changePhotoMiddleware);
app.post("/api/upload", upload.single("image"), handleUpload);
app.post("/api/delete", deleteInstances);
app.post("/api/logout", logout);
app.use("/api/media", express.static("media"));

// Listener

app.listen(PORT, () => console.log(`Server listening on ${PORT}...`));

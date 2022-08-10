const cookieParser = require("cookie-parser");
const router = require("express").Router();
const login = require("../controllers/login/login");
const refreshtoken = require("../controllers/login/refreshtoken");

// Middleware
router.use(cookieParser());

// Routing
//
//
router.post("/", login);
router.get("/refreshtoken", refreshtoken);

module.exports = router;

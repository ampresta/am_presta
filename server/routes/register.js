const refreshtoken = require("../controllers/login/refreshtoken");
const register = require("../controllers/register/register");
const router = require("express").Router();

// Routing
router.post("/", register)
router.get("/refreshtoken", refreshtoken)

module.exports = router;

const express = require("express");
const refreshtoken = require("../controllers/login/refreshtoken");
const register = require("../controllers/login/register");
const router = express.Router()

router.post("/", register)
router.get("/refreshtoken", refreshtoken)

module.exports = router;

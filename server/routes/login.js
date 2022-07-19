const cookieParser = require("cookie-parser");
const express = require("express");
const login = require("../controllers/login/login");
const refreshtoken = require("../controllers/login/refreshtoken");
const register = require("../controllers/login/register");
const router=express.Router()
router.post("/",login)
router.post("/register",register)
router.use(cookieParser())
router.get("/refreshtoken",refreshtoken)
module.exports=router;


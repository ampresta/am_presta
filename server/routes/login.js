const cookieParser = require("cookie-parser");
const changePassword = require("../controllers/login/changePassword");
const router = require("express").Router();
const login = require("../controllers/login/login");
const refreshtoken = require("../controllers/login/refreshtoken");
const getImage = require("../controllers/other/getImage");
const checkCaptcha = require("../middlewares/checkCaptcha");
const checkSociete = require("../middlewares/checkSociete");
// Middleware
router.use(cookieParser());

// Routing
//
//
router.use("/", checkCaptcha);
router.post("/", login);
router.get("/refreshtoken", refreshtoken);

router.post("/changepass", changePassword);
router.use("/getimage", checkSociete);
router.get("/getimage", getImage);
module.exports = router;

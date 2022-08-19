const cookieParser = require("cookie-parser");
const router = require("express").Router();
const login = require("../controllers/login/login");
const refreshtoken = require("../controllers/login/refreshtoken");
const getImage = require("../controllers/other/getImage");
const checkSociete = require("../middlewares/checkSociete");
// Middleware
router.use(cookieParser());

// Routing
//
//
router.post("/", login);
router.get("/refreshtoken", refreshtoken);

router.use("/getimage", checkSociete);
router.get("/getimage", getImage);
module.exports = router;

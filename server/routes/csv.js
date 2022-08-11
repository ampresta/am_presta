const router = require("express").Router();
const main = require("../controllers/csv/main")

// Middleware
// router.use(cookieParser());

// Routing

router.get("/", main);

module.exports = router;

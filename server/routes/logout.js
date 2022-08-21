const cookieParser = require("cookie-parser");
const logout = require("../controllers/logout/logout");
router.use(cookieParser());
router.post("/", logout);
module.exports = router;

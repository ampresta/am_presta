const {
  func1,
  func2,
  func3,
} = require("../controllers/route1/route1Controller");
const signedin = require("../middlewares/signedin");
const router = require("express").Router();

router.use(signedin);
router.get("/", func1);
router.get("/sub_route1", func2);
router.get("/sub_route2", func3);

module.exports = router;


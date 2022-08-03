const { Router } = require("express");
const addCours = require("../controllers/cours/addCours");
const browseCourse = require("../controllers/cours/browseCourse");
const signedin = require("../middlewares/signedin");
const CheckSuperAdmin = require("../middlewares/checkSuperAdmin");
router = Router();


// router.use(signedin);
// Please don't change the order
// Super Admin Links

// router.use("/add", CheckSuperAdmin);
// router.use("/browse", CheckSuperAdmin);

router.post("/add", addCours);
router.all("/browse", browseCourse);

module.exports = router;

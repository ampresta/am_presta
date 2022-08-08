const { Router } = require("express");
const addCours = require("../controllers/cours/addCours");
const browseCourse = require("../controllers/cours/browseCourse");
const signedin = require("../middlewares/signedin");
const CheckSuperAdmin = require("../middlewares/checkSuperAdmin");
const browseCoursSoc = require("../controllers/cours/browseCoursSoc");
const checkSociete = require("../middlewares/checkSociete");
router = Router();

router.use(signedin);
// Please don't change the order
// Super Admin Links

// router.use("/add", CheckSuperAdmin);
// router.use("/browse", CheckSuperAdmin);

router.post("/add", addCours);
router.all("/browse", browseCourse);
router.use("/browsesoc", checkSociete);
router.all("/browsesoc", browseCoursSoc);
module.exports = router;

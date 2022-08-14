const router = require("express").Router();

const addDept = require("../controllers/departement/addDept");
const browsDeptAdmin = require("../controllers/departement/browsDeptAdmin");

const checkSociete = require("../middlewares/checkSociete");
//AM PRESTA

router.all("/browsedeptsam", browsDeptAdmin);

router.use(checkSociete);
router.post("/add", addDept);

module.exports = router;

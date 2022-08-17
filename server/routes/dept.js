const router = require("express").Router();

const addDept = require("../controllers/departement/addDept");
const addDeptAdmin = require("../controllers/departement/addDeptAdmin");
const browsDeptAdmin = require("../controllers/departement/browsDeptAdmin");

const checkSociete = require("../middlewares/checkSociete");
//AM PRESTA

router.all("/browsedeptsam", browsDeptAdmin);

router.post("/adminadd", addDeptAdmin);
router.use(checkSociete);
router.post("/add", addDept);

module.exports = router;

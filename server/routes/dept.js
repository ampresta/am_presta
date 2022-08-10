const router = require("express").Router();

const addDept = require("../controllers/departement/addDept");
const browseDept = require("../controllers/departement/browseDept");

const checkSociete = require("../middlewares/checkSociete");

router.use(checkSociete);
router.post("/add", addDept);
router.get("/browse", browseDept);

module.exports = router;

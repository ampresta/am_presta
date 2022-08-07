const addSociete = require("../controllers/societe/addSociete");
const associateAdminSociete = require("../controllers/societe/associateAdminSociete");
const browseRequests = require("../controllers/societe/browseRequests");
const browseSociete = require("../controllers/societe/browseSociete");
const checkSociete = require("../middlewares/checkSociete");
const router = require("express").Router();

router.post("/add", addSociete);
router.all("/browse", browseSociete);
router.post("/assign", associateAdminSociete);

router.use("/browserequests", checkSociete);
router.get("/browserequests", browseRequests);
module.exports = router;

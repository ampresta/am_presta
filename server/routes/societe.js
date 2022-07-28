const addSociete = require("../controllers/societe/addSociete");
const associateAdminSociete = require("../controllers/societe/associateAdminSociete");
const browseSociete = require("../controllers/societe/browseSociete");
const router = require("express").Router();

router.post("/add", addSociete);
router.all("/browse", browseSociete);
router.post("/assign", associateAdminSociete);
module.exports = router;

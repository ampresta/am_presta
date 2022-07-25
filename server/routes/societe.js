const addSociete = require("../controllers/societe/addSociete");
const browseSociete = require("../controllers/societe/browseSociete");
const router = require("express").Router();

router.post("/add", addSociete);
router.all("/browse", browseSociete);
module.exports = router;

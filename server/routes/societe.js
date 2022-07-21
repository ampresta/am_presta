const addSociete = require("../controllers/societe/addSociete");
const router = require("express").Router();

router.post("/add", addSociete);
module.exports = router;

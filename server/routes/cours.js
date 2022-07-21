const { Router } = require("express");
const addCours = require("../controllers/cours/addCours");

router = Router();
router.post("/add", addCours);

module.exports = router;

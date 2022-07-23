const { Router } = require("express");
const addCours = require("../controllers/cours/addCours");
const browseCourse = require("../controllers/cours/browseCourse");

router = Router();
router.post("/add", addCours);
router.all("/browse", browseCourse);
module.exports = router;

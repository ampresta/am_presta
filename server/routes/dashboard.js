const { Router } = require("express");
const amcards = require("../controllers/dashboard/amcards");
const amgraphs = require("../controllers/dashboard/amgraphs");
const ampdash = require("../controllers/dashboard/ampdash");
const amtable = require("../controllers/dashboard/amtable");
const amtop = require("../controllers/dashboard/amtop");

router = Router();
router.post("/amcards", amcards);
router.post("/amtable", amtable);
router.post("/amgraphs", amgraphs);
router.post("/topcourses", amtop);
module.exports = router;

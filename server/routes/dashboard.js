const { Router } = require("express");
const amcards = require("../controllers/dashboard/amcards");
const amgraphs = require("../controllers/dashboard/amgraphs");
const ampdash = require("../controllers/dashboard/ampdash");
const amtable = require("../controllers/dashboard/amtable");

router = Router();
router.post("/amcards", amcards);
router.post("/amtable", amtable);
router.post("/amgraphs", amgraphs);
module.exports = router;

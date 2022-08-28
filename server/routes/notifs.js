const { Router } = require("express");
const addNotif = require("../controllers/nontifs/addNotif");
const browseNotifsSoc = require("../controllers/nontifs/browseNotifsSoc");
const router = Router();

router.get("/add", addNotif);
router.post("/browseSoc", browseNotifsSoc);

module.exports = router;

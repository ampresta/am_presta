const { Router } = require("express");
const addNotif = require("../controllers/nontifs/addNotif");
const browseNotifsSoc = require("../controllers/nontifs/browseNotifsSoc");
const readNotifsCollab = require("../controllers/nontifs/readNotifsCollab");
const readNotifsSoc = require("../controllers/nontifs/readNotifsSoc");
const router = Router();

router.get("/add", addNotif);
router.post("/browseSoc", browseNotifsSoc);


router.post("/readNotifCollab", readNotifsCollab);
router.post("/readNotifSoc", readNotifsSoc);

module.exports = router;

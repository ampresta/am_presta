const { Router } = require("express");
const browseNotifsCollab = require("../controllers/nontifs/browseNotifsCollab");
const browseNotifsSoc = require("../controllers/nontifs/browseNotifsSoc");
const readNotifsCollab = require("../controllers/nontifs/readNotifsCollab");
const readNotifsSoc = require("../controllers/nontifs/readNotifsSoc");
const router = Router();

const checkCollaborateur = require("../middlewares/checkCollaborateur");
const checkSociete = require("../middlewares/checkSociete");

router.use("/browsesoc", checkSociete);
router.post("/browsesoc", browseNotifsSoc);

router.use("/browsecollab", checkCollaborateur);
router.post("/browsecollab", browseNotifsCollab);

router.post("/readnotifcollab", readNotifsCollab);
router.post("/readnotifsoc", readNotifsSoc);

module.exports = router;

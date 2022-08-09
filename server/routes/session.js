const { Router } = require("express");
const addSession = require("../controllers/session/addSession");
const browseSession = require("../controllers/session/browseSession");
const browseSessionSoc = require("../controllers/session/browseSessionSoc");
const checkSociete = require("../middlewares/checkSociete");
const router = Router();
const signedin = require("../middlewares/signedin");

router.use(signedin);
router.use("/browsesoc", checkSociete);
router.post("/browsesoc", browseSessionSoc);
router.use("/add", checkSociete);
router.post("/add", addSession);
router.use("/browse", checkSociete);
router.all("/browse", browseSession);

module.exports = router;

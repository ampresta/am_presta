const { Router } = require("express");
const addSession = require("../controllers/session/addSession");
const browseSession = require("../controllers/session/browseSession");
const browseSessionSoc = require("../controllers/session/browseSessionSoc");
const SessionCollab = require("../controllers/session/SessionCollab");
const SessionDetailsGraph = require("../controllers/session/SessionDetailsGraph");
const checkSociete = require("../middlewares/checkSociete");
const router = Router();
const signedin = require("../middlewares/signedin");

router.use(signedin);   
router.use(checkSociete);
router.post("/browsesoc", browseSessionSoc);
router.post("/add", addSession);
router.all("/browse", browseSession);
router.post("/graph", SessionDetailsGraph);
router.post("/collab", SessionCollab);
module.exports = router;

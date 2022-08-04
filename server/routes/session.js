const { Router } = require("express");
const addSession = require("../controllers/session/addSession");
const browseSession = require("../controllers/session/browseSession");
const checkSociete = require("../middlewares/checkSociete");
router = Router();

router.post("/add", addSession);
router.use("/browse", checkSociete);
router.all("/browse", browseSession);

module.exports = router;

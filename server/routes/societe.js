const addSociete = require("../controllers/societe/addSociete");
const associateAdminSociete = require("../controllers/societe/associateAdminSociete");
const browseCollab = require("../controllers/societe/browseCollab");
const browseRequests = require("../controllers/societe/browseRequests");
const browseSociete = require("../controllers/societe/browseSociete");
const CreateCollabsforSociete = require("../controllers/societe/CreateCollabsforSociete");
const checkSociete = require("../middlewares/checkSociete");
const router = require("express").Router();
const signedin = require("../middlewares/signedin");

router.use(signedin);

router.post("/add", addSociete);
router.all("/browse", browseSociete);
router.post("/assign", associateAdminSociete);

router.use("/addcollab", checkSociete);
router.post("/addcollab", CreateCollabsforSociete);

router.use("/browserequests", checkSociete);
router.get("/browserequests", browseRequests);

router.use("/browsecollabs", checkSociete);
router.get("/browsecollabs", browseCollab);
module.exports = router;

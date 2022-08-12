const browseDept = require("../controllers/departement/browseDept");
const addSociete = require("../controllers/societe/addSociete");
const associateAdminSociete = require("../controllers/societe/associateAdminSociete");
const browseCollab = require("../controllers/societe/browseCollab");
const browseRequests = require("../controllers/societe/browseRequests");
const browseSociete = require("../controllers/societe/browseSociete");
const CreateCollabsforSociete = require("../controllers/societe/CreateCollabsforSociete");
const getUerSociete = require("../controllers/societe/getUerSociete");
const checkSociete = require("../middlewares/checkSociete");
const router = require("express").Router();
const signedin = require("../middlewares/signedin");

// router.use(signedin);

router.post("/add", addSociete);
router.all("/browse", browseSociete);
router.post("/assign", associateAdminSociete);
router.post("/uerSociete", getUerSociete);

// router.use(checkSociete);
router.post("/addcollab", CreateCollabsforSociete);

router.get("/browserequests", browseRequests);

router.get("/browsecollabs", browseCollab);

router.all("/browsedepts", browseDept);
module.exports = router;

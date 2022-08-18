const { Router } = require("express");
const AddCollabOutOfSession = require("../controllers/collaborator/AddCollabOutOfSession");
const AddCollabToSession = require("../controllers/collaborator/AddCollabToSession");
const addManyCollabs = require("../controllers/collaborator/addManyCollabs");
const browseCollabs = require("../controllers/collaborator/browseCollabs");
const browseCollabsAdmin = require("../controllers/collaborator/browseCollabsAdmin");
const FinishCollabSession = require("../controllers/collaborator/FinishCollabSession");
const RequestCours = require("../controllers/collaborator/RequestCours");
const checkCollaborateur = require("../middlewares/checkCollaborateur");
const checkSociete = require("../middlewares/checkSociete");
const signedin = require("../middlewares/signedin");
const router = Router();

// router.use(signedin);
router.get("/browseadmin", browseCollabsAdmin);

router.use(checkSociete);
// router.post("/addmany", addManyCollabs);
router.get("/browse", browseCollabs);
router.post("/addsession", AddCollabToSession);
router.post("/finishsession", FinishCollabSession);
router.use("/sendrequest", checkCollaborateur);
router.post("/sendrequest", RequestCours);
router.post("/browseout", AddCollabOutOfSession);
module.exports = router;

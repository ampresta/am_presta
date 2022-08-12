const { Router } = require("express");
const AddCollabToSession = require("../controllers/collaborator/AddCollabToSession");
const addManyCollabs = require("../controllers/collaborator/addManyCollabs");
const browseCollabs = require("../controllers/collaborator/browseCollabs");
const FinishCollabSession = require("../controllers/collaborator/FinishCollabSession");
const RequestCours = require("../controllers/collaborator/RequestCours");
const checkCollaborateur = require("../middlewares/checkCollaborateur");
const router = Router();
const signedin = require("../middlewares/signedin");

// router.use(signedin);
router.post("/addmany", addManyCollabs);
router.get("/browse", browseCollabs);

router.post("/addsession", AddCollabToSession);
router.post("/finishsession", FinishCollabSession);
router.use("/sendrequest", checkCollaborateur);
router.post("/sendrequest", RequestCours);
module.exports = router;

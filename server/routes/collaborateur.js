const { Router } = require("express");
const AddCollabToSession = require("../controllers/collaborator/AddCollabToSession");
const FinishCollabSession = require("../controllers/collaborator/FinishCollabSession");
router = Router();
router.post("/addsession", AddCollabToSession);
router.post("/finishsession", FinishCollabSession);
module.exports = router;

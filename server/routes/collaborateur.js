const { Router } = require("express");
const AddCollabToCourse = require("../controllers/collaborator/AddCollabToCourse");
const FinishCollabCourse = require("../controllers/collaborator/FinishCollabCourse");
router = Router();
router.post("/add", AddCollabToCourse);
router.post("/finish", FinishCollabCourse);
module.exports = router;

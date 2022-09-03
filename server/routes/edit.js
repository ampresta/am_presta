const { Router } = require("express");
const editCourses = require("../controllers/cours/editCourses");
const editSessions = require("../controllers/session/editSession");
const router = Router();
router.post("/course",editCourses)
router.post("/session",editSessions)
//router.post("/course",editCourses)

// router.use(signedin);

module.exports = router;

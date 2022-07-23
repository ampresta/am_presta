const { Router } = require("express");
const addSession = require("../controllers/session/addSession");
router = Router();
router.post("/add", addSession);

module.exports = router;

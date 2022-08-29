const { Router } = require("express");
const getProfile = require("../controllers/profile/getProfile");
const updateProfile = require("../controllers/profile/updateProfile");
const router = Router();

const checkCollaborateur = require("../middlewares/checkCollaborateur");

router.use("/", checkCollaborateur);
router.post("/", getProfile);

router.use("/update", checkCollaborateur);
router.post("/update", updateProfile);

module.exports = router;

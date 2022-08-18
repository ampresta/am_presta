const { Router } = require("express");
const assignToCollab = require("../controllers/voucher/assignToCollab");
const checkSociete = require("../middlewares/checkSociete");
const router = Router();
router.use(checkSociete);
router.post("/assign", assignToCollab);
router.post("/assignall");
module.exports = router;

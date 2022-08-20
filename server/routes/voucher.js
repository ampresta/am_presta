const { Router } = require("express");
const addVoucher = require("../controllers/voucher/addVoucher");
const assigntoAll = require("../controllers/voucher/assigntoAll");
const assignToCollab = require("../controllers/voucher/assignToCollab");
const browse_admin = require("../controllers/voucher/browse_admin");
const browse_soc = require("../controllers/voucher/browse_soc");
const checkSociete = require("../middlewares/checkSociete");
// const browse_admin = 
const router = Router();

router.post("/add", addVoucher);
router.get("/browseAdmin", browse_admin);
router.use(checkSociete);
router.post("/browseSoc", browse_soc);
router.post("/assign", assignToCollab);
router.post("/assignall", assigntoAll);
module.exports = router;

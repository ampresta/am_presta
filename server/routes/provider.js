const { Router } = require("express");
const addProvider = require("../controllers/provider/addProvider");
const browseProvider = require("../controllers/provider/browseProvider");

const router = Router();
const signedin = require("../middlewares/signedin");

router.use(signedin);
router.post("/add", addProvider);
router.get("/browse", browseProvider);

module.exports = router;

const { Router } = require("express");
const addProvider = require("../controllers/provider/addProvider");
const browseProvider = require("../controllers/provider/browseProvider");

const router = Router();
router.post("/add", addProvider);
router.get("/browse", browseProvider);

module.exports = router;

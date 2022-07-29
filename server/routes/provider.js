const { Router } = require("express");
const addProvider = require("../controllers/provider/addProvider");

const router = Router();
router.post("/add", addProvider);

module.exports = router;

const { Router } = require("express");
const addDept = require("../controllers/departement/addDept");

router = Router();

router.post("/add", addDept);

module.exports = router;

const router = require("express").Router();
const addDept = require("../controllers/departement/addDept");

router.post("/add", addDept);

module.exports = router;

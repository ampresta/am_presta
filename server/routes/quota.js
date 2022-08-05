const { Router } = require("express");
const addQuota = require("../controllers/quota/addQuota");

const r = Router();

r.post("/add", addQuota);
module.exports = r;

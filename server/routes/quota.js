const { Router } = require("express");
const addQuota = require("../controllers/quota/addQuota");
const modifyQuota = require("../controllers/quota/modifyQuota");

const r = Router();

r.post("/add", addQuota);
r.post("/browse", modifyQuota);
module.exports = r;

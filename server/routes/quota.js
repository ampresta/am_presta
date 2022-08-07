const { Router } = require("express");
const addQuota = require("../controllers/quota/addQuota");
const browseQuota = require("../controllers/quota/browseQuota");
const modifyQuota = require("../controllers/quota/modifyQuota");

const r = Router();

r.post("/add", addQuota);

r.post("/modify", modifyQuota);
r.post("/browse", browseQuota);
module.exports = r;

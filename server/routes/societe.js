const express = require("express");
const addSociete = require("../controllers/societe/addSociete");

router=express.Router();
router.post('/add',addSociete);
module.exports=router

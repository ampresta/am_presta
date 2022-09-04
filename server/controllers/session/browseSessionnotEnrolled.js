
const sequelize = require("sequelize");
const db = require("../../config/database");
const { Cours, Session, Provider, Collaborateur, Proof, Session_Collab } =
  db.models;
module.exports=async (req,res)=>{
	console.log("hnaya")
const {id}=req.body
	if (!id){

	return res.sendStatus(403);
	}

	const sess= await Session.findAll({
		where:{
			$Collaborateurs$:null
		},
		include:{

			model:Collaborateur,
			required:false,
			where:{
				id		}
		},

	})

return res.send({status:true,sess})

}

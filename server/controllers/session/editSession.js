
const db = require("../../config/database");

const { Session } = db.models;
module.exports=async (req,res)=>{
const {id,nom,}  =req.body
	if(!id || !nom ){
	return res.send({status:false,msg:"Error Empty Fields"})

	}
const sess= await Session.findOne({
	 where:{
		id
	 }
})
	if(!sess){
return res.send({status:true,msg:"Session Not Found"})
	}
sess.set({
	nom:nom.trim(),
 }
)
await sess.save()
return res.send({status:true,msg:"Update Done"})



}

const Quota = require("../../models/Quota");

module.exports= async (req,res)=>{
	{id,quota} = req.body
	if (! id){
		return res.json({"status":false,"message":"No parameters passed"})
	}
	try{
		Quota.update({quota:quota},{ where: {id:id}} );
		return res.json({"status":true,"message":"update Done"})
	}catch{
		return res.json({"status":false,"message":"error in update"})
	}
}

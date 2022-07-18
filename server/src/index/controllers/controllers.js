module.exports.login = (req, res) => {
  if (req.body){
 	
	    email=req.body["username"];
	    password=req.body["password"];
	  
	
  }
  res.send("error");
};

module.exports.register = (req, res) => {
  if (req.body) {
    console.log(req.body.email);
  }
};

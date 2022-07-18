module.exports.login = (req, res) => {
  if (req.body){
 	
	    res.send(req.body["email"]);

	
  }
  res.send("error");
};

module.exports.register = (req, res) => {
  if (req.body) {
    console.log(req.body.email);
  }
};

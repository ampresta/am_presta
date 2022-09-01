module.exports = (req, res) => {
  res.cookie(
    "jbid"," ",

    {
	maxAge:0	
    }
  );
  return res.send({ status: true });
};

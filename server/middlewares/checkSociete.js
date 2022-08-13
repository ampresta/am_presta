const { verify } = require("jsonwebtoken");
module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.send({ msg: "no header" });
  }
  token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.sendStatus(403);
  }
  try {
    payload = verify(token, process.env.JWTSALT);
    console.log(payload);
    if (payload.type === "Societe") {
      req.societe = payload.id;

      console.log("------------------------------");
      console.log(req.societe);
      console.log("------------------------------");

      return next();
    } else {
      console.log(payload);
      return res.send({ status: false, msg: "Not a Societe" });
    }
  } catch (err) {
    console.log(err);
    return res.sendStatus(401);
  }
};

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
    if (payload.type === "Societe") {
      return next();
    } else {
      console.log(payload);
      return res.send({ status: false, msg: "Not a Societe" });
    }
  } catch (err) {
    return res.send({ msg: "stuck in middleware", err });
  }
};

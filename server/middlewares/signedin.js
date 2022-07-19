const { verify } = require("jsonwebtoken");
module.exports = (req, res, next) => {
  try {
    token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.sendStatus(403);
    }
    payload = verify(token, process.env.JWTSALT);
    req.user = payload["user_id"];
    return next();
  } catch (err) {
    return res.sendStatus(403);
  }
};

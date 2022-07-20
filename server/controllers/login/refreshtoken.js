const User = require("../../models/Users");
const { verify } = require("jsonwebtoken");

module.exports = async (req, res) => {
  const jwt = req.cookies["jbid"];
  if (!jwt) {
    return res.sendStatus(403);
  }
  try {
    payload = verify(jwt, JWT_REFRESH_SALT);
    user_ = User.findOne({ where: { id: payload.user_id } });
    if (!user_) {
      return res.sendStatus(403);
    }
    accesstoken = sign({ user_id: user_.id }, process.env.JWTSALT, {
      expiresIn: "15m",
    });

    refreshtoken = sign({ user_id: user_.id }, process.env.JWT_REFRESH_SALT, {
      expiresIn: "7d",
    });
    res.cookie("jbid", refreshtoken, { httpOnly: true });
    return res.json({ accesstoken: accesstoken });
  } catch (err) {
    return res.sendStatus(403);
  }
};

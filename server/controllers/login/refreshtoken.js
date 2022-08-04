const db = require("../../config/database");
const { User } = db.models;
module.exports = async (req, res) => {
  const jwt = req.cookies["jbid"];
  if (!jwt) {
    return res.send({ status: false, msg: "No cookie" });
  }
  try {
    payload = verify(jwt, process.env.JWT_REFRESH_SALT);
    user_ = await User.findOne({ where: { id: payload.user_id } });
    if (!user_) {
      return res.send({ status: false, msg: "No user" });
    }
    accesstoken = sign(payload, process.env.JWTSALT, {
      expiresIn: "15m",
    });

    refreshtoken = sign(payload, process.env.JWT_REFRESH_SALT, {
      expiresIn: "7d",
    });
    res.cookie("jbid", refreshtoken, { httpOnly: true });
    return res.json({ accesstoken: accesstoken });
  } catch (err) {
    console.log(err);
    return res.send({ status: false, msg: err });
  }
};

const { verify, sign } = require("jsonwebtoken");
const db = require("../../config/database");
const { User } = db.models;
module.exports = async (req, res) => {
  const jwt = req.cookies["jbid"];
  if (!jwt) {
    return res.send({ status: false, msg: "No cookie" });
  }
  try {
    payload = verify(jwt, process.env.JWT_REFRESH_SALT);
    console.log(payload);
    user_ = await User.findOne({ where: { id: payload.user_id } });
    if (!user_) {
      return res.send({ status: false, msg: "No user" });
    }
    accesstoken = sign(
      { user_id: payload.user_id, type: payload.type },
      process.env.JWTSALT,
      {
        expiresIn: "15m",
      }
    );

    refreshtoken = sign(
      { user_id: payload.user_id, type: payload.type },
      process.env.JWT_REFRESH_SALT,
      {
        expiresIn: "7d",
      }
    );
    res.cookie("jbid", refreshtoken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    return res.send({ status: true, accesstoken });
  } catch (err) {
    console.log(err);
    return res.send({ status: false, msg: err });
  }
};

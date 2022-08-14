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
    user_ = await User.findOne({ where: { id: payload.user_id } });
    if (!user_) {
      return res.send({ status: false, msg: "No user" });
    }

    payload2 = { user_id: payload.user_id, type: payload.type };
    if (payload.id) {
      payload2.id = payload.id;
    }
    accesstoken = sign(payload2, process.env.JWTSALT, {
      expiresIn: "15m",
    });

    refreshtoken = sign(payload2, process.env.JWT_REFRESH_SALT, {
      expiresIn: "7d",
    });
    res.cookie("jbid", refreshtoken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    console.log(payload2);
    return res.send({ status: true, accesstoken, type: payload.type });
  } catch (err) {
    console.log(err);
    return res.send({ status: false, msg: err });
  }
};

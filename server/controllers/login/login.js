const User = require("../../models/Users");
const argon2 = require("argon2");
const { sign } = require("jsonwebtoken");
module.exports = async (req, res) => {
  if (req.method == "POST") {
    user = req.body["username"];
    password = req.body["password"];
    const user_ = await User.findOne({ where: { username: user } });
    if (user_ == null) {
      return res.send("Not found!");
    } else {
      pep = process.env.PEPPER;
      try {
        if (await argon2.verify(user_.password, password + pep)) {
          refreshtoken = sign(
            { user_id: user_.id },
            process.env.JWT_REFRESH_SALT,
            { expiresIn: "7d" }
          );
          res.cookie("jbid", refreshtoken, { httpOnly: true });
          accesstoken = sign({ user_id: user_.id }, process.env.JWTSALT, {
            expiresIn: "15m",
          });
          return res.json({ accesstoken: accesstoken });
        } else {
          return res.send("Wrong Credentials");
        }
      } catch (err) {
        return res.send("error: " + err);
      }
    }
  }
  return res.send("NOT POST");
};

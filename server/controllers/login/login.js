const db = require("../../config/database");
const { User } = db.models;
const argon2 = require("argon2");
const { sign } = require("jsonwebtoken");
const GetType = require("./GetType");

module.exports = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.send({ status: false, msg: "Check parameters" });
    }
    const user = await User.findOne({ where: { username } });

    if (user === null)
      return res.send({ status: false, msg: "User Not found!" });

    const pep = process.env.PEPPER;

    const checkUser = await argon2.verify(user.password, password + pep);

    if (checkUser) {
      type = await GetType(user);
      if (type === "Error") {
        return res.json({ status: false, msg: "Undefined User Type " });
      }
      const refreshtoken = sign(
        { user_id: user.id, type },
        process.env.JWT_REFRESH_SALT,
        { expiresIn: "7d" }
      );

      res.cookie("jbid", refreshtoken, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });
      accesstoken = sign({ user_id: user.id, type }, process.env.JWTSALT, {
        expiresIn: "15m",
      });
      return res.json({ status: true, accesstoken, type, userId: user.id });
    }

    return res.send({ status: false, msg: "Username or Password incorrect" });
  } catch (err) {
    return res.send("error: " + err);
  }
};

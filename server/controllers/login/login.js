const User = require("../../models/Users");
const argon2 = require("argon2");
const { sign } = require("jsonwebtoken");

module.exports = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username } });

    if (user === null)
      return res.send({ status: false, msg: "User Not found!" });

    const pep = process.env.PEPPER;

    const chekcUser = await argon2.verify(user.password, password + pep);

    if (chekcUser) {
      const refreshtoken = sign(
        { user_id: user.id },
        process.env.JWT_REFRESH_SALT,
        { expiresIn: "7d" }
      );

      res.cookie("jbid", refreshtoken, { httpOnly: true });
      accesstoken = sign({ user_id: user.id }, process.env.JWTSALT, { expiresIn: "15m" });
      return res.json({ accesstoken });
    } 

    return res.send({ status: false, msg: "Wrong Credentials" });
  } catch (err) {
    return res.send("error: " + err);
  }
};

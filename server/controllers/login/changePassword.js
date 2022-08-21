const sequelize = require("../../config/database");
const argon2 = require("argon2");
const { verify } = require("jsonwebtoken");
const { User } = sequelize.models;
module.exports = async (req, res) => {
  const pep = process.env.PEPPER;
  const { password } = req.body;
  console.log("\x1b[36mPASSWORDLOG:\x1b[0m");
  console.log(password);
  if (!password) {
    return res.send({ status: false, msg: "no password" });
  }
  if (!req.headers.authorization) {
    return res.send({ msg: "no header" });
  }
  token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.sendStatus(403);
  }
  try {
    const payload = verify(token, process.env.JWTSALT);

    const user_ = await User.findOne({ where: { id: payload.user_id } });
    if (!user_) {
      return res.send({ status: false, msg: "No user" });
    }
    const hash = await argon2.hash(password + pep);
    user_.password = hash;
    const collab = await user_.getCollaborateur();
    if (!collab) {
      return res.send({ status: false });
    }
    collab.changedpass = true;
    await collab.save();
    await user_.save();
    return res.send({
      status: true,
      msg: "PAsswords changed",
    });
  } catch (err) {
    console.log(err);
    return res.send({ status: false });
  }
};

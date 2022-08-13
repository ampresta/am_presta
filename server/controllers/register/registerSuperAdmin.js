const argon2 = require("argon2");
const db = require("../../config/database");

const { SuperAdmin, User } = db.models;
module.exports = async (req, res) => {
  try {
    const { username, password, nom, prenom } = req.body;

    const pep = process.env.PEPPER;
    if (!prenom || !nom || !username || !password) return res.sendStatus(403);

    const usernameCheck = await User.findOne({ where: { username } });
    if (usernameCheck)
      return res.json({ status: false, msg: "Username already used" });

    const hash = await argon2.hash(password + pep);
    const user = await User.create(
      {
        username: username,
        password: hash,
        SuperAdmin: {
          nom,
          prenom,
        },
      },
      {
        include: [{ association: User.SuperAdmin }],
      }
    );

    return res.send({ status: true, msg: "SuperAdmin Created Successfully" });
  } catch (err) {
    console.log(err);
    return res.send({ msg: "an Error Occurred during your registration" });
  }
};

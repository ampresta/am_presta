const argon2 = require("argon2");
const db = require("../../config/database");
const { Collaborateur, Societe, User } = db.models;
module.exports = async (req, res) => {
  try {
    const { username, password, nom, prenom, societe, email } = req.body;

    const pep = process.env.PEPPER;
    if (!societe || !prenom || !nom || !username || !password || !email)
      return res.sendStatus(403);

    const societeCheck = await Societe.findOne({ where: { name: societe } });
    if (societeCheck)
      return res.json({ status: false, msg: "societe already used" });
    const usernameCheck = await User.findOne({ where: { username } });
    if (usernameCheck)
      return res.json({ status: false, msg: "Username already used" });
    const emailCheck = await User.findOne({ where: { email } });
    if (usernameCheck)
      return res.json({ status: false, msg: "email already used" });

    const hash = await argon2.hash(password + pep);
    const user = await User.create(
      {
        username: username,
        password: hash,
        email,
        Collaborateur: {
          nom,
          prenom,

          Societe: {
            name: societe,
          },
          admin: true,
          instructor: false,
        },
      },
      {
        include: [
          { association: User.Collaborateur, include: [Collaborateur.Societe] },
        ],
      }
    );
    return res.send({
      status: true,
      msg: "User Created Successfully",
      id: user.Collaborateur.SocieteId,
    });
  } catch (err) {
    return res.send({ msg: "error " + err });
  }
};

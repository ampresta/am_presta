const argon2 = require("argon2");
const db = require("../../config/database");
const Email = require("../../emails/Email");
const { Collaborateur, Societe, User } = db.models;
module.exports = async (req, res) => {
  let user = null;
  try {
    let { username, nom, prenom, societe, email } = req.body;

    const pep = process.env.PEPPER;
    if (!societe || !prenom || !nom || !username || !email)
      return res.sendStatus(403);
    societe = societe.trim().toLowerCase();
    email = email.trim().toLowerCase();
    nom = nom.trim().toLowerCase();
    prenom = prenom.trim().toLowerCase();
    const societeCheck = await Societe.findOne({ where: { name: societe } });
    if (societeCheck)
      return res.json({ status: false, msg: "societe already used" });
    const usernameCheck = await User.findOne({ where: { username } });
    if (usernameCheck)
      return res.json({ status: false, msg: "Username already used" });
    const emailCheck = await User.findOne({ where: { email } });
    if (emailCheck)
      return res.json({ status: false, msg: "email already used" });

    const password = Array(8)
      .fill()
      .map(() => ((Math.random() * 36) | 0).toString(36))
      .join("");
    const hash = await argon2.hash(password + pep);
    user = await User.create(
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
    Email.sendRegister(email, "", username, password, societe, true);
    return res.send({
      status: true,
      msg: "User Created Successfully",
      id: user.Collaborateur.SocieteId,
    });
  } catch (err) {
    // collab = await user.getCollaborator();
    // soc = await collab.getSociete();
    // console.log(collab);

    // console.log(soc);
    // await soc.destroy({ force: true });
    // await collab.destroy({ force: true });
    // await user.destroy({ force: true });
    return res.send({ msg: "error " + err });
  }
};

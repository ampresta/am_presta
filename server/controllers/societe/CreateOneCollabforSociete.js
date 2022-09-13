const argon2 = require("argon2");
const db = require("../../config/database");
const Email = require("../../emails/Email");
const { Collaborateur, Societe, User } = db.models;
module.exports = async (req, res) => {
  const { account } = req.body;
  if (!account) {
    return res.sendStatus(403);
  }
  const societe = await Societe.findOne({
    attributes: ["name"],
    where: { id: req.societe },
  });
  const pep = process.env.PEPPER;
  try {
    let { nom, prenom, email } = account;
    if (!email || !prenom || !nom) return res.sendStatus(403);
    const emailCheck = await User.findOne({ where: { email } });
    if (emailCheck)
      return res.json({ status: false, msg: "email already used" });
	nom=nom.trim().toLowerCase()
	    prenom=prenom.trim().toLowerCase()

      username = `${nom.replace(/\s/g,'_')}.${prenom.replace(/\s/g,'_')}`;
   // username = `${nom}.${prenom}`;
    const password = Array(8)
      .fill()
      .map(() => ((Math.random() * 36) | 0).toString(36))
      .join("");
    i = 1;
    while (true) {
      usernameCheck = await User.findOne({ where: { username } });
      if (!usernameCheck) {
        break;
      }
      username = `${username}${i}`;
      i++;
    }
    email_institu = `${username}@institute-eca.ma`;
    const hash = await argon2.hash(password + pep);
    const user = await User.create(
      {
        username,
        password: hash,
        email,
        Collaborateur: {
          nom,
          prenom,
          email_institu,
          SocieteId: req.societe,
          admin: false,
          instructor: false,
        },
      },
      {
        include: [{ association: User.Collaborateur }],
      }
    );
    Email.sendRegister(email, email_institu, username, password, societe.name);
    return res.send({
      status: true,
      msg: "Users Created Successfully",
      id: user.Collaborateur.id,
    });
  } catch (err) {
    return res.send({ msg: "error " + err });
  }
};

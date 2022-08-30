const argon2 = require("argon2");
const db = require("../../config/database");
const Email = require("../../emails/Email");
const { Collaborateur, Societe, User } = db.models;

module.exports = async (req, res) => {
  const { collabs } = req.body;
  if (!collabs) {
    return res.sendStatus(403);
  }
  const societe = await Societe.findOne({
    attributes: ["name"],
    where: { id: req.societe },
  });

  const pep = process.env.PEPPER;
  for (account of collabs) {
    try {
      const { nom, prenom, email } = account;

      if (!prenom || !nom) return res.sendStatus(403);
      username = `${nom}.${prenom}`;
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
        username = `${nom}.${prenom}${i}`;
        i++;
      }

      email_institu = `${username}@institute-eca.ma`;
      const hash = await argon2.hash(password + pep);
      await User.create(
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
      Email.sendRegister(
        email,
        email_institu,
        username,
        password,
        societe.name
      );
    } catch (err) {
      return res.send({ msg: "error " + err });
    }
  }
  return res.send({
    status: true,
    msg: "Users Created Successfully",
  });
};

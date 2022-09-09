const argon2 = require("argon2");
const db = require("../../config/database");
const Email = require("../../emails/Email");
const CreateReport = require("../other/CreateReport");
const { Collaborateur, Societe, User } = db.models;

module.exports = async (req, res) => {
  // console.log("ADDIJNG")
  const { collabs } = req.body;
  if (!collabs) {
    return res.sendStatus(403);
  }
  const societe = await Societe.findOne({
    attributes: ["name"],
    where: { id: req.societe },
  });
  errors = [];
  const pep = process.env.PEPPER;
  index = 1;
  for (account of collabs) {
    try {
      var { nom, prenom, email } = account;

      if (!prenom || !nom || !email) {
        errors.push({ row: `${index + 1}`, error: "empty row" });
        index++;
        continue;
      }
      email = email.trim();
      emailCheck = await User.findOne({ where: { email } });
      if (emailCheck) {
        errors.push({ row: `${index + 1}`, error: "email already exists" });
        index++;
        continue;
      }

      nom = nom.trim().toLowerCase();
      prenom = prenom.trim().toLowerCase();

      username = `${nom.replace(/\s/g, "_")}.${prenom.replace(/\s/g, "_")}`;

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
      index++;
    } catch (err) {
      errors.push({ row: `${index + 1}`, error: err });
      index++;
    }
  }
  var report = null;
  console.log("errors", errors);
  if (errors.length > 0) {
    report = await CreateReport(errors);
  }
  console.log("rep", report);
  return res.send({
    status: errors.length == 0 ? true : false,
    msg:
      errors.length == 0 ? "Users Created Successfully " : "Error check report",
    report: report ? report : null,
  });
};

const argon2 = require("argon2");
const Collaborateur = require("../../models/Collaborateur");
const Departement = require("../../models/Departement");
const Societe = require("../../models/Societe");
User = require("../../models/Users");
module.exports = async (req, res) => {
  if (req.method == "POST") {
    user = req.body["username"];
    password = req.body["password"];
    nom = req.body["nom"];
    prenom = req.body["prenom"];
    societe = req.body["societe"];
    pep = process.env.PEPPER;
    if (!societe || !prenom || !nom || !user || !password) {
      return res.sendStatus(403);
    }

    try {
      const hash = await argon2.hash(password + pep);
      await User.create(
        {
          username: user,
          password: hash,
          Collaborateur: {
            nom: nom,
            prenom: prenom,

            SocieteId: societe,
            admin: true,
            instructor: false,
          },
        },
        { include: [Collaborateur] }
      );

      return res.send("Done");
    } catch (err) {
      return res.send("error " + err);
    }
  }
  return res.send("NOT POST");
};

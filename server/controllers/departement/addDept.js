const Departement = require("../../models/Departement");

module.exports = async (req, res) => {
  nom = req.body["name"];
  societe = req.body["societe"];
  if (!nom || !societe) {
    return res.sendStatus(403);
  }
  try {
    await Departement.create({ nom: nom, SocieteId: societe });
  } catch (err) {
    console.log(err);
    return res.sendStatus(403);
  }
  return res.send("Done");
};

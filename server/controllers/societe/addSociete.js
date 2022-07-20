const Societe = require("../../models/Societe");

module.exports = async (req, res) => {
  nom = req.body["name"];
  if (!nom) {
    return res.sendStatus(403);
  }
  try {
    await Societe.create({ name: nom });
  } catch (err) {
    console.log(err);
    return res.sendStatus(403);
  }
  return res.send("Done");
};

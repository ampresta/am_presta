const Collaborateur = require("../../models/Collaborateur");
const Cours = require("../../models/Cours");
const Provider = require("../../models/Provider");
const Societe = require("../../models/Societe");
module.exports = async (req, res) => {
  const { model, id } = req.body;
  if (model == "cours") {
    Model = Cours;
  } else if (model == "societe") {
    Model = Societe;
  } else if (model == "provider") {
    Model = Provider;
  } else if (model == "Collaborateur") {
    Model = Collaborateur;
  } else {
    return res.sendStatus(404);
  }
  const u = await Model.findOne({ id });
  u.image = req.file.path;
  await u.save();
  console.log(req.file.path);
  return res.send({ go: req.file.path });
};

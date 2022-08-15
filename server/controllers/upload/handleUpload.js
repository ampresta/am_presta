const db = require("../../config/database");
const { Collaborateur, Cours, Provider, Societe } = db.models;
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
  try {
    const u = await Model.findOne({ where: { id } });
    u.image = req.file.path;
    await u.save();
    return res.send({ go: req.file.path });
  } catch (err) {
    return res.send({ status: false });
  }
};

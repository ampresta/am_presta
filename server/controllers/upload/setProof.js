const db = require("../../config/database");
const { Collaborateur, Cours, Provider, Societe } = db.models;
module.exports = async (req, res) => {
  const { id, type } = req.body;
  if (!id || !type) {
    return res.sendStatus(403);
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

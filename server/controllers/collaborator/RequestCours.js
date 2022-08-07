const sequelize = require("../../config/database");
const { Cours, Collaborateur } = sequelize.models;

module.exports = async (req, res) => {
  const collab = await Collaborateur.findByPk(req.collab);
  if (!collab) {
    return res.sendStatus(403);
  }

  const { cours } = req.body;
  if (!cours) {
    return res.sendStatus(403);
  }
  try {
    const crs = await Cours.findByPk(cours);
    if (!crs) {
      return res.send({ status: false, msg: "Cours not found" });
    }
    collab.addCours(crs);
    return res.send({ status: true, msg: "Request Created" });
  } catch (err) {
    console.log(err);
    return res.send({ status: "error" });
  }
};

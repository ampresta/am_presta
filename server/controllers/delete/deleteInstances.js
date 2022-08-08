const db = require("../../config/database");
const { Request, Societe, Provider, Cours, Collaborateur } = db.models;
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
  } else if (model == "Request") {
    Model = Request;
  } else {
    return res.sendStatus(404);
  }
  await Model.destroy({ where: { id } });

  return res.send({ status: true, msg: "deleted" });
};

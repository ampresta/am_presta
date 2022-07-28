const Cours = require("../../models/Cours");
const Societe = require("../../models/Societe");
const Provider = require("../../models/Provider");
module.exports = async (req, res) => {
  const { model } = req.body;
  if (model == "cours") {
    Model = Cours;
  } else if (model == "societe") {
    Model = Societe;
  } else if (model == "provider") {
    Model = Provider;
  } else {
    return res.sendStatus(404);
  }
  count = await Model.count();
  return res.send({
    count,
  });
};

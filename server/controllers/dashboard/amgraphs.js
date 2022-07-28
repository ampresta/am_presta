const Cours = require("../../models/Cours");
const Societe = require("../../models/Societe");
const Provider = require("../../models/Provider");
const sequelize = require("sequelize");
module.exports = async (req, res) => {
  const { model } = req.body;
  console.log(model);
  if (model == "cours") {
    Model = Cours;
  } else if (model == "societe") {
    Model = Societe;
  } else if (model == "provider") {
    Model = Provider;
  } else {
    return res.sendStatus(404);
  }
  chart = await Model.findAll({
    attributes: [
      [db.fn("count", db.col("id")), "count"],
      [db.fn("extract", sequelize.literal('month FROM "createdAt"')), "month"],
    ],
    group: ["month"],
  });
  return res.send({
    chart,
  });
};

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
    order: [sequelize.literal("month")],
  });
  results = [];
  now = 1;
  val = 0;
  chart.forEach((element) => {
    console.log(parseInt(element.dataValues.month));
    while (true) {
      ex = false;
      if (now == parseInt(element.dataValues.month)) {
        val += parseInt(element.dataValues.count);
        ex = true;
      }

      results[now - 1] = val;
      now++;
      if (ex) {
        break;
      }
    }
  });

  return res.send({
    results,
  });
};

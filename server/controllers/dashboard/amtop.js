const sequelize = require("sequelize");
const Cours = require("../../models/Cours");
const Provider = require("../../models/Provider");
module.exports = async (req, res) => {
  companies = await Cours.findAll({
    include: {
      model: Provider,
      attributes: ["nom"],
    },
    attributes: ["nom", "image"],
    order: ["updatedAt"],
    limit: 3,
  });

  return res.send({
    companies,
  });
};

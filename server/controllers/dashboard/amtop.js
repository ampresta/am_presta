const db = require("../../config/database");
const { Cours, Provider } = db.models;
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

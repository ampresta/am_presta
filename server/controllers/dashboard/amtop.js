const Collaborateur = require("../../models/Collaborateur");
const Cours = require("../../models/Cours");
const Societe = require("../../models/Societe");
module.exports = async (req, res) => {
  companies = await Societe.findAll({
    include: {
      model: Collaborateur,
      attributes: [],
    },
    attributes: [[db.fn("count", "CollaborateurId"), "count"]],
    order: ["count", "DESC"],
    limit: 3,
  });

  return res.send({
    companies,
  });
};

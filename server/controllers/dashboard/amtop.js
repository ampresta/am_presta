const sequelize = require("sequelize");
const Collaborateur = require("../../models/Collaborateur");
const Societe = require("../../models/Societe");
module.exports = async (req, res) => {
  companies = await Societe.findAll({
    include: {
      model: Collaborateur,
      attributes: [],
    },
    attributes: [[db.fn("count", "CollaborateurId"), "count"]],
    order: [sequelize.literal("count DESC")],
    limit: 3,
  });

  return res.send({
    companies,
  });
};

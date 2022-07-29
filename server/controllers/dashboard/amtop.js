const sequelize = require("sequelize");
const Collaborateur = require("../../models/Collaborateur");
const Societe = require("../../models/Societe");
module.exports = async (req, res) => {
  companies = await Societe.findAll({
    include: {
      model: Collaborateur,
      attributes: [],
    },
    attributes: ["name", [db.fn("count", "CollaborateurId"), "count"]],
    order: [sequelize.literal("count DESC")],
    limit: 3,
    group: ["Societe.id"],
  });

  return res.send({
    companies,
  });
};

const Cours = require("../../models/Cours");
const Societe = require("../../models/Societe");
module.exports = async (req, res) => {
  companies = await Societe.findAll({ limit: 3, order: ["createdAt"] });
  return res.send({
    companies,
  });
};

const sequelize = require("sequelize");
const db = require("../../config/database");
const { Societe, Collaborateur, Quota, Provider } = db.models;
module.exports = async (req, res) => {
  filters = {};
  filters.include = {
    model: Collaborateur,
    attributes: ["nom", "prenom"],
    where: {
      admin: true,
    },
  };
  filters.include = {
    model: Quota,
    attributes: ["quota"],
    include: {
      model: Provider,
      attributes: ["nom"],
    },
  };
  societe = await Societe.findAll(filters);
  return res.json({ status: true, msg: societe });
};

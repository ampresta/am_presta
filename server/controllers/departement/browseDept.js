const sequelize = require("../../config/database");
const db = require("../../config/database");
const { Departement } = db.models;
module.exports = async (req, res) => {
  const departements = await Departement.findAll({
    group: ["Departement.id"],
    includeIgnoreAttributes: false,
    Where: { SocieteId: req.societe },
  }); // Implementing search

  return res.json(departements);
};

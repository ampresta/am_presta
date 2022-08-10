const { Op } = require("sequelize");
const sequelize = require("../../config/database");
const db = require("../../config/database");
const { Cours, Provider } = db.models;
module.exports = async (req, res) => {
  const providers = await Provider.findAll({
    group: ["Provider.id"],
    include: [
      {
        model: Cours,
        // where: {
        //   deletedAt: { [Op.is]: null },
        // },
        attributes: [],
      },
    ],
    attributes: {
      include: [[sequelize.fn("count", "Cours.id"), "course_num"]],
    },
  }); // Implementing search
  return res.json(providers);
};

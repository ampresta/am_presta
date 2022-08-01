const sequelize = require("../../config/database");
const Cours = require("../../models/Cours");
const Provider = require("../../models/Provider");

module.exports = async (req, res) => {
  const providers = await Provider.findAll({
    group: ["Provider.id"],
    includeIgnoreAttributes: false,
    include: [
      {
        model: Cours,
        attributes: ["id"],
      },
    ],
    attributes: {
      include: [[sequelize.fn("count", "Cours.id"), "course_num"]],
    },
  }); // Implementing search
  return res.json(providers);
};

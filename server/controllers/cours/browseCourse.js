const Cours = require("../../models/Cours");
const sequelize = require("sequelize");
module.exports = async (req, res) => {
  if (req.method == "POST") {
    filters = {};

    const { search, provider } = req.body;

    if (search) {
      filters.attributes = {
        include: [
          [sequelize.fn("similarity", sequelize.col("nom"), search), "score"],
        ],
      };
      filters.where = [
        sequelize.where(
          sequelize.fn("similarity", sequelize.col("nom"), search),
          { [sequelize.Op.gt]: 0.3 }
        ),
      ];
    }
    if (provider) {
      if (filters.where) {
        temp = filters.where;
        filters.where = { [sequelize.Op.and]: [filters.where, { provider }] };
      } else {
        filters.where = { provider };
      }
    }
    console.log(filters);

    const cours = await Cours.findAll(filters); // Implementing search
    return res.json(cours);
  } else {
    const cours = await Cours.findAll(); // Implementing search
    return res.json(cours);
  }
};

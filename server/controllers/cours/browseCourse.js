const Cours = require("../../models/Cours");
const sequelize = require("sequelize");
const Session = require("../../models/Session");
const Session_Collab = require("../../models/Session_Collab");
module.exports = async (req, res) => {
  if (req.method == "POST") {
    filters = {};

    const { search, provider } = req.body;

    if (search) {
      filters.include = [
        {
          model: Session,
          attributes: ["id"],
        },
      ];
      filters.attributes = {
        include: [
          [
            sequelize.fn("similarity", sequelize.col("Cours.nom"), search),
            "score",
          ],

          [sequelize.fn("count", sequelize.col("Sessions.id")), "sessions"],
        ],
      };
      filters.where = [
        sequelize.where(
          sequelize.fn("similarity", sequelize.col("Cours.nom"), search),
          { [sequelize.Op.gt]: 0.1 }
        ),
      ];

      filters.group = ["Cours.id", "Sessions.id"];
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

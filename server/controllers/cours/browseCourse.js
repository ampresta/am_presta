const Cours = require("../../models/Cours");
const sequelize = require("sequelize");
const Session = require("../../models/Session");
module.exports = async (req, res) => {
  filters = {};

  filters.include = [
    {
      model: Session,
      attributes: ["id"],
    },
  ];

  filters.attributes = {
    include: [
      // [
      //   sequelize.fn("similarity", sequelize.col("Cours.nom"), search),
      //   "score",
      // ],

      [sequelize.fn("count", sequelize.col("Sessions.id")), "sessions"],
    ],
  };

  filters.group = ["Cours.id", "Sessions.id"];
  if (req.method == "POST") {
    const { search, provider } = req.body;

    if (search) {
      filters.attributes.include.push([
        sequelize.fn("similarity", sequelize.col("Cours.nom"), search),
        "score",
      ]);
      filters.where = [
        sequelize.where(
          sequelize.fn("similarity", sequelize.col("Cours.nom"), search),
          { [sequelize.Op.gt]: 0.1 }
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
    const cours = await Cours.findAll(filters); // Implementing search
    return res.json(cours);
  }
};

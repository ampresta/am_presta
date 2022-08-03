const Cours = require("../../models/Cours");
const sequelize = require("sequelize");
const Session = require("../../models/Session");
const Provider = require("../../models/Provider");
const Collaborateur = require("../../models/Collaborateur");
module.exports = async (req, res) => {
  filters = {};

  filters.include = [
    {
      model: Session,
      attributes: [],
      include: {
        model: Collaborateur,
        attributes: [],
        through: { attributes: [] },
      },
    },
    {
      model: Provider,
      attributes: ["id", "nom"],
    },
  ];

  filters.attributes = {
    include: [
      [sequelize.fn("count", sequelize.col("Sessions.id")), "sessions"],
      [
        sequelize.fn("count", sequelize.col("Sessions->Collaborateurs.id")),
        "collabs",
      ],
      [
        sequelize.fn(
          "sum",
          sequelize.col("Sessions->Collaborateurs->Session_Collab.status")
        ),
        "collabs_fin",
      ],
    ],
  };
  filters.group = ["Cours.id", "Provider.id"];
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
        filters.where = {
          [sequelize.Op.and]: [filters.where, { ProviderId: provider }],
        };
      } else {
        filters.where = { ProviderId: provider };
      }
    }
    console.log(filters);
    try {
      const cours = await Cours.findAll(filters); // Implementing search
      return res.json(cours);
    } catch (err) {
      console.log(err);
      return res.send({ status: "error" });
    }
  } else {
    console.log(filters);
    const cours = await Cours.findAll(filters); // Implementing search
    return res.json(cours);
  }
};

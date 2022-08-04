const sequelize = require("sequelize");
const db = require("../../config/database");
const { Cours, Session, Provider, Collaborateur } = db.models;
module.exports = async (req, res) => {
  filters = {};

  filters.include = [
    {
      model: Cours,
      attributes: [],
      include: {
        model: Provider,
        attributes: ["nom"],
      },
    },
    {
      model: Collaborateur,
      attributes: [],
      through: {
        attributes: [],
      },
    },
  ];

  filters.attributes = {
    include: [
      [sequelize.fn("count", sequelize.col("Collaborateurs.id")), "collabs"],
    ],
  };
  filters.group = ["Session.id", "Cour->Provider.id"];
  filters.where = { SocieteId: req.societe };
  if (req.method == "POST") {
    const { search, provider } = req.body;

    if (search) {
      filters.attributes.include.push([
        sequelize.fn("similarity", sequelize.col("Session.nom"), search),
        "score",
      ]);
      search_filters = [
        sequelize.where(
          sequelize.fn("similarity", sequelize.col("Session.nom"), search),
          { [sequelize.Op.gt]: 0.1 }
        ),
      ];

      if (filters.where) {
        filters.where = {
          [sequelize.Op.and]: [filters.where, search_filters],
        };
      } else {
        filters.where = search_filters;
      }
    }

    if (provider) {
      if (filters.where) {
        filters.where = {
          [sequelize.Op.and]: [filters.where, { ProviderId: provider }],
        };
      } else {
        filters.where = { ProviderId: provider };
      }
    }
    console.log(filters);
    try {
      const sessions = await Session.findAll(filters); // Implementing search
      return res.json(sessions);
    } catch (err) {
      console.log(err);
      return res.send({ status: "error" });
    }
  } else {
    console.log(filters);
    const sessions = await Session.findAll(filters); // Implementing search
    return res.send(sessions);
  }
};

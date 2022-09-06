const sequelize = require("sequelize");
const db = require("../../config/database");
const { Cours, Session, Provider, Collaborateur, Proof, Session_Collab } =
  db.models;
module.exports = async (req, res) => {
  filters = {};

  filters.include = [
    {
      model: Session_Collab,
      attributes: [],
      include: [
        {
          model: Proof,
          attributes: [],
          as: "certifs",
          required: false,
          where: {
            status: "accepted",
          },
        },
        {
          model: Collaborateur,
          attributes: [],
          where: {
            admin: false,
            instructor: false,
          },
        },
      ],
    },
  ];

  filters.attributes = {
    include: [
      [
        sequelize.fn(
          "count",
          sequelize.col("Session_Collabs.Collaborateur.id")
        ),
        "collabs",
      ],

      [
        sequelize.fn("count", sequelize.col("Session_Collabs->certifs.id")),
        "collabs_fin",
      ],
    ],
  };
  filters.group = ["Session.id", "Cour.id", "Cour->Provider.id"];
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
      filters.include.push({
        model: Cours,
        required: true,
        attributes: ["id", "image", "nom"],
        include: {
          model: Provider,
          attributes: ["nom", "id"],
          required: true,
          where: {
            id: provider,
          },
        },
      });
    } else {
      filters.include.push({
        model: Cours,
        required: true,
        attributes: ["id", "image", "nom"],
        include: {
          model: Provider,
          required: true,
          attributes: ["nom", "id"],
        },
      });
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
    filters.include.push({
      model: Cours,
      required: true,
      attributes: ["id", "image", "nom"],
      include: {
        model: Provider,
	      required:true,
        attributes: ["nom", "id"],
      },
    });
    // console.log(filters);
    const sessions = await Session.findAll(filters); // Implementing search
    return res.send(sessions);
  }
};

const sequelize = require("sequelize");
const db = require("../../config/database");
const {
  Session_Collab,
  Proof,
  Cours,
  Session,
  Provider,
  Collaborateur,
  Societe,
} = db.models;
module.exports = async (req, res) => {
  filters = {};

  const { paranoid } = req.body;
  filters.paranoid = paranoid !== undefined ? false : true;
  filters.include = [
    { model: Societe, attributes: ["name"] },
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
  filters.group = ["Session.id", "Societe.id", "Cour.id", "Cour->Provider.id"];
  // filters.where = { SocieteId: req.societe };
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
          attributes: ["nom"],
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
          attributes: ["nom"],
        },
      });
    }
    console.log(filters);
    try {
      const sessions = await Session.findAll(filters); // Implementing search
      return res.send({ status: true, sessions });
    } catch (err) {
      console.log(err);
      return res.send({ status: false });
    }
  } else {
    filters.include.push({
      model: Cours,
      required: true,
      attributes: ["id", "image", "nom"],
      include: {
        model: Provider,
        attributes: ["nom"],
      },
    });
    // console.log(filters);
    const sessions = await Session.findAll(filters); // Implementing search
    return res.send({ status: true, sessions });
  }
};

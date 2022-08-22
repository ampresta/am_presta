const sequelize = require("sequelize");
const db = require("../../config/database");
const {
  Cours,
  Proof,
  Session_Collab,
  Session,
  Provider,
  Collaborateur,
  Quota,
} = db.models;
module.exports = async (req, res) => {
  filters = {};

  filters.include = [
    {
      model: Session,
      where: {
        SocieteId: req.societe,
      },
      required: false,
      attributes: [],
      include: {
        model: Session_Collab,
        // required:false,
        attributes: [],
        include: [
          {
            model: Proof,
            attributes: [],
            as: "certifs",
            required: false,
            where: {
              status: true,
            },
          },
          {
            model: Collaborateur,
            // required: false,
            attributes: [],
            where: {
              admin: false,
              instructor: false,
            },
          },
        ],
      },
      // ],
    },
    {
      model: Provider,
      required: true,
      attributes: ["id", "nom"],
      include: {
        model: Quota,
        required: true,
        where: { SocieteId: req.societe },
        attributes: [],
      },
    },
  ];
  filters.attributes = {
    include: [
      [
        sequelize.fn(
          "count",
          sequelize.fn("distinct", sequelize.col("Sessions.id"))
        ),
        "sessions",
      ],
      [
        sequelize.fn(
          "count",
          //   sequelize.fn(
          //     "distinct",
          sequelize.col("Sessions->Session_Collabs->Collaborateur.id")
          // )
        ),
        "collabs",
      ],
      [
        sequelize.fn(
          "count",
          sequelize.fn(
            "distinct",
            sequelize.col("Sessions->Session_Collabs->certifs.id")
          )
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
      return res.send({ status: true, cours });
    } catch (err) {
      console.log(err);
      return res.send({ status: false });
    }
  } else {
    console.log(filters);
    const cours = await Cours.findAll(filters); // Implementing search
    return res.send({ status: true, cours });
  }
};

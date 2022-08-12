const sequelize = require("sequelize");
const db = require("../../config/database");
const { Cours, Session_Collab, Session, Proof, Collaborateur } = db.models;
module.exports = async (req, res) => {
  const { sess } = req.body;
  if (!sess) {
    return res.sendStatus(403);
  }
  const session = await Session.findOne({
    where: {
      SocieteId: req.societe,
      id: sess,
    },
    include: [
      {
        model: Cours,
        attributes: ["image"],
      },

      {
        model: Session_Collab,
        attributes: [],
        include: [
          {
            model: Proof,
            required: false,
            as: "certifs",
            where: {
              status: true,
            },
            attributes: [],
          },

          {
            model: Proof,
            as: "fincourse",
            required: false,
            where: {
              status: true,
            },
            attributes: [],
          },
          {
            model: Collaborateur,
            attributes: [],
          },
        ],
      },
    ],
    attributes: {
      include: [
        [
          sequelize.fn("count", sequelize.col("Session_Collabs->certifs.id")),
          "certifs_count",
        ],
        [
          sequelize.fn("count", sequelize.col("Session_Collabs->fincourse.id")),
          "fincourse_count",
        ],
        [
          sequelize.fn(
            "count",
            sequelize.col("Session_Collabs->Collaborateur.id")
          ),
          "collab_count",
        ],
      ],
    },
    group: ["Session.id", "Cour.id"],
  });
  return res.send({
    status: true,
    session,
  });
};

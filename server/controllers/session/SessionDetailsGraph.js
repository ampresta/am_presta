const sequelize = require("sequelize");
const db = require("../../config/database");
const { Cours, Session_Collab, Session, Proof, Collaborateur } = db.models;
module.exports = async (req, res) => {
  const { sess } = req.body;
  if (!sess) {
    console.log(req.body);
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
            as: "certifs",
            where: {
              status: true,
            },
            attributes: [],
          },

          {
            model: Proof,
            as: "fincourse",
            where: {
              status: true,
            },
            attributes: [],
          },
        ],
      },
    ],
    attributes: {
      include: [
        [
          sequelize.fn("count", sequelize.col("Session_Collab->certifs.id")),
          "certifs_count",
        ],
        [
          sequelize.fn("count", sequelize.col("Session_Collab->fincourse.id")),
          "fincourse_count",
        ],
        [
          sequelize.fn(
            "count",
            sequelize.col("Session_Collab.CollaborateurId")
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

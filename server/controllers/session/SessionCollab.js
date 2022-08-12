const sequelize = require("sequelize");
const db = require("../../config/database");
const { Session_Collab, Session, Proof, Collaborateur } = db.models;
module.exports = async (req, res) => {
  const { sess } = req.body;
  if (!sess) {
    return res.sendStatus(403);
  }
  const collab = await Collaborateur.findAll({
    where: {
      SocieteId: req.societe,
    },
    include: {
      model: Session_Collab,
      attributes: ["id", "score", "createdAt"],

      where: {
        SessionId: sess,
      },
      include: [
        {
          model: Proof,
          attributes: ["id"],
          as: "certifs",
          required: false,
          where: {
            status: true,
          },
        },

        {
          model: Proof,
          attributes: ["id"],
          required: false,
          as: "fincourse",
          where: {
            status: true,
          },
        },
      ],
    },
    group: [
      "Collaborateur.id",
      "Session_Collabs.id",
      "Session_Collabs.score",
      "Session_Collabs->certifs.id",
      "Session_Collabs->fincourse.id",
      "Session_Collabs.createdAt",
    ],
  });
  return res.send({
    status: true,
    collab,
  });
};

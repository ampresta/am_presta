const sequelize = require("sequelize");
const db = require("../../config/database");
const { Session_Collab, Session, Proof, Collaborateur } = db.models;
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
    include: {
      model: Collaborateur,
      include: {
        model: Session_Collab,
        include: [
          {
            model: Proof,
            as: "certifs",
            where: {
              status: true,
            },
          },

          {
            model: Proof,
            as: "fincourse",
            where: {
              status: true,
            },
          },
        ],
      },
      // attributes: {
      //   include: [
      //     [sequelize.fn("count"), sequelize.col("certifs.id"), "certifs_count"],
      //     [
      //       sequelize.fn("count"),
      //       sequelize.col("fincourse.id"),
      //       "fincourse_count",
      //     ],
      //     [
      //       sequelize.fn("count", sequelize.count("Collaborateur.id")),
      //       "collab_count",
      //     ],
      //   ],
      // },
    },
  });
  return res.send({
    status: true,
    session,
  });
};

const sequelize = require("sequelize");
const db = require("../../config/database");
const { Session_Collab, Session, User, Proof, Collaborateur, Voucher } =
  db.models;
module.exports = async (req, res) => {
  const { sess } = req.body;
  if (!sess) {
    return res.sendStatus(403);
  }
  const collab = await Collaborateur.findAll({
    where: {
      SocieteId: req.societe,
      admin: false,
      instructor: false,
    },
    include: [
      {
        model: Session_Collab,
        attributes: ["id", "createdAt"],

        where: {
          SessionId: sess,
        },
        include: [
          {
            model: Proof,
            // attributes: ["id", "file"],
            as: "certifs",
            required: false,
          },

          {
            model: Proof,
            // attributes: ["id", "file"],
            required: false,
            as: "fincourse",
          },
          {
            model: Voucher,
            // attributes: ["code"],
          },
        ],
      },
      {
        model: User,
        attributes: ["email"],
      },
    ],
    group: [
      "Collaborateur.id",
      "User.id",
      "Session_Collabs.id",
      "Session_Collabs->certifs.id",
      "Session_Collabs->Voucher.id",
      "Session_Collabs->fincourse.id",
      "Session_Collabs.createdAt",
    ],
  });
  return res.send({
    status: true,
    collab,
  });
};

const sequelize = require("sequelize");
const db = require("../../config/database");
const { Societe, Collaborateur, Session_Collab, Proof } = db.models;

module.exports = async (req, res) => {
  const collabs = await Collaborateur.findAll({
    include: [
      {
        model: Societe,
        required: true,
        attributes: ["name"],
      },
      {
        model: Session_Collab,
        attributes: [],
        include: {
          attributes: [],
          model: Proof,
          as: "certifs",
          where: {
            status: "accepted",
          },
        },
      },
    ],
    attributes: {
      include: [
        [
          sequelize.fn("count", sequelize.col("Session_Collabs.id")),
          "session_count",
        ],
        [
          sequelize.fn("count", sequelize.col("Session_Collabs->certifs.id")),
          "certifs_count",
        ],
      ],
    },
    where: { admin: false, instructor: false },
    group: ["Collaborateur.id", "Societe.id"],
  });
  return res.send(collabs);
};

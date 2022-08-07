const sequelize = require("sequelize");
const db = require("../../config/database");
const { Collaborateur, Session } = db.models;
module.exports = async (req, res) => {
  await Collaborateur.findAll({
    group: ["Sessions.id", "Collaborateur.id"],
    include: [
      {
        model: Session,
        attributes: ["id"],
        where: { statut: false },
        include: {
          model: Collaborateur,
          attributes: [],
          through: {
            attributes: [],
          },
        },
      },
      {
        model: Session,
        attributes: ["id"],
        include: {
          model: Collaborateur,
          attributes: [],
          through: { attributes: [] },
        },
      },
    ],
    where: {
      SocieteId: req.societe,
    },
    attributes: [
      [sequelize.fn("count", "Sessions->Collaborateurs.id"), "active_sessions"],
      [
        sequelize.fn("count", "Sessions->Collaborateurs.id"),
        "enrolled _courses",
      ],
    ],
  });
};

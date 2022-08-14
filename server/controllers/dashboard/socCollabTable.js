const sequelize = require("sequelize");
const db = require("../../config/database");
const { Societe, Collaborateur, Session_Collab, Proof } = db.models;
module.exports = async (req, res) => {
  collabs = await Collaborateur.findAll({
    // limit: 3,
    where: {
      SocieteId: req.societe,
    },
    include: {
      model: Session_Collab,
      attributes: [],
      include: {
        model: Proof,
        as: "certifs",
        attributes: [],
        where: {
          status: true,
        },
      },
    },
    attributes: {
      include: [
        [
          sequelize.fn("count", sequelize.col("Session_Collabs->certifs.id")),
          "certifs_count",
        ],
      ],
    },

    group: ["Collaborateur.id"],
    // order: ["certifs_count", "DESC"],
  });
  return res.send({
    collabs,
  });
};

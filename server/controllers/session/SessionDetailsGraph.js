const sequelize = require("sequelize");
const db = require("../../config/database");
const { Session, Collaborateur } = db.models;
module.exports = async (req, res) => {
  const { sess } = req.body;
  const session = await Session.findOne({
    where: {
      SocieteId: req.societe,
      id: sess,
    },
    include: {
      model: Collaborateur,
      include: [
        {
          model: "certifs",
          where: {
            status: true,
          },
        },

        {
          model: "fincourse",
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
  });
  return res.send({
    status: true,
    session,
  });
};

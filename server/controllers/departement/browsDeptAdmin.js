const sequelize = require("sequelize");
const db = require("../../config/database");
const { Departement, Challenge, Collaborateur } = db.models;
module.exports = async (req, res) => {
  try {
    const departements = await Departement.findAll({
      include: [
        {
          model: Collaborateur,
          attributes: [],
        },
        {
          model: Challenge,
          attributes: [],
          through: {
            attributes: [],
          },
        },
      ],
      attributes: {
        include: [
          [
            sequelize.fn("count", sequelize.col("Collaborateurs.id")),
            "collab_count",
          ],
          [
            sequelize.fn("count", sequelize.col("Challenges.id")),
            "challenge_count",
          ],
        ],
      },
      // where: { SocieteId: req.societe },
      group: ["Departement.id"],
    }); // Implementing search
    return res.send({ status: true, data: departements });
  } catch (err) {
    console.log(err);

    return res.send({ status: false });
  }
};

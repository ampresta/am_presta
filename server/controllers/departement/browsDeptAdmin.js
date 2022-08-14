const sequelize = require("sequelize");
const db = require("../../config/database");
const { Departement, Challenge, Collaborateur, Societe } = db.models;
module.exports = async (req, res) => {
  try {
    const departements = await Departement.findAll({
      include: [
        {
          model: Societe,
          attributes: ["name"],
        },
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
      group: ["Departement.id", "Societe.id"],
    }); // Implementing search
    return res.send({ status: true, data: departements });
  } catch (err) {
    console.log(err);

    return res.send({ status: false });
  }
};

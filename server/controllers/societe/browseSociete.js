const Societe = require("../../models/Societe");
const sequelize = require("sequelize");
const Collaborateur = require("../../models/Collaborateur");

module.exports = async (req, res) => {
  if (req.method === "POST") {
    const { search } = req.body;
    if (search) {
      console.log(search);
      filters = {};
      filters.include = {
        model: Collaborateur,
        attributes: ["nom"],
        where: {
          admin: true,
        },
      };
      filters.attributes = {
        include: [
          [
            sequelize.fn("similarity", sequelize.col("Societe.name"), search),
            "score",
          ],
        ],
      };
      filters.where = [
        sequelize.where(
          sequelize.fn("similarity", sequelize.col("Societe.name"), search),
          { [sequelize.Op.gt]: 0.1 }
        ),
      ];
      societe = await Societe.findAll(filters);
      return res.json({ status: true, msg: societe });
    } else {
      societe = await Societe.findAll();

      return res.json({ status: false, msg: societe });
    }
  }

  societe = await Societe.findAll();

  return res.json({ status: true, msg: societe });
};

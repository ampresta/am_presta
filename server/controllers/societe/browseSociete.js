const sequelize = require("sequelize");
const db = require("../../config/database");
const { Societe, Collaborateur, Quota, Provider } = db.models;
module.exports = async (req, res) => {
  filters = {};
  const { paranoid } = req.body;
  console.log(paranoid);
  filters.paranoid = paranoid !== undefined ? false : true;
  filters.include = {
    model: Collaborateur,
    attributes: ["nom", "prenom"],
    where: {
      admin: true,
    },
  };

  if (req.method === "POST") {
    const { search } = req.body;

    if (search) {
      console.log(search);

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
      societe = await Societe.findAll(filters);

      return res.json({ status: true, msg: societe });
    }
  }

  societe = await Societe.findAll(filters);

  return res.json({ status: true, msg: societe });
};

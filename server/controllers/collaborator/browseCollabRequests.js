const sequelize = require("sequelize");
const db = require("../../config/database");
const { Collaborateur, Cours, Request } = db.models;
module.exports = async (req, res) => {
  const requests = await Request.findAll(
    {
      include: [
        {
          model: Cours,
          required: true,
          attributes: ["id", "nom", "image"],
        },
        {
          model: Collaborateur,
          where: {
            id: req.collab,
          },
        },
      ],
    },
    {
      paranoid: false,
    }
  );
  return res.send({ status: true, requests });
};

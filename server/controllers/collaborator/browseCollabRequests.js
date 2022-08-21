const sequelize = require("sequelize");
const db = require("../../config/database");
const { Collaborateur, Cours, Request } = db.models;
module.exports = async (req, res) => {
  collabs = await Request.findAll({
    include: [
      {
        model: Cours,
        required: true,
        attributes: ["id", "nom"],
      },
      {
        model: Collaborateur,
        required: true,
        where: {
          CollabId: req.collab,
        },
      },
    ],
  });
  return res.send(collabs);
};

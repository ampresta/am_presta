const sequelize = require("sequelize");
const db = require("../../config/database");
const { Collaborateur, Cours, Request } = db.models;
module.exports = async (req, res) => {
  collabs = await Request.findAll({
    where: {
      status: false,
    },
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
          SocieteId: req.societe,
        },
      },
    ],
    // group: [
    //   "Collaborateur.id",
    //   "Cours.id",
    //   "Cours->Requests.CourId",
    //   "Cours->Requests.CollaborateurId",
    // ],
  });
  return res.send(collabs);
};

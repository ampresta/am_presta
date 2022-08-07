const sequelize = require("sequelize");
const db = require("../../config/database");
const { Collaborateur, Cours } = db.models;
module.exports = async (req, res) => {
  collabs = await Collaborateur.findAll({
    include: {
      model: Cours,
      required: true,
      attributes: ["id"],
      through: {
        attributes: ["createdAt", "CourId", "CollaborateurId"],
      },
    },
    where: {
      SocieteId: req.societe,
    },
    // group: [
    //   "Collaborateur.id",
    //   "Cours.id",
    //   "Cours->Requests.CourId",
    //   "Cours->Requests.CollaborateurId",
    // ],
  });
  return res.send(collabs);
};

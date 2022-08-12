const sequelize = require("sequelize");
const db = require("../../config/database");
const { Collaborateur } = db.models;
module.exports = async (req, res) => {
  const collabs = await Collaborateur.findAll({
    attributes: [
      "id",
      "nom",
      "prenom",
      "email",
      "image",
      "DepartementId",
      "createdAt",
    ],
    where: { admin: false, instructor: false },
  });
  return res.send(collabs);
};

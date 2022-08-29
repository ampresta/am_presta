const sequelize = require("sequelize");
const db = require("../../config/database");

const { Collaborateur, User, Societe } = db.models;

module.exports = async (req, res) => {
  const { collab } = req;
  try {
    const profile = await Collaborateur.findByPk(collab, {
      attributes: ["nom", "prenom", "email_institu", "image"],
      include: [
        {
          model: User,
          attributes: ["email", "username"],
        },
        {
          model: Societe,
          attributes: ["name"],
        },
      ],
    });
    return res.send(profile);
  } catch (error) {
    console.log(error);
    return res.send({ status: false });
  }
};

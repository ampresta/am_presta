const { where } = require("sequelize");
const sequelize = require("sequelize");
const db = require("../../config/database");
const { Cours, Session, Provider, Collaborateur } = db.models;
module.exports = async (req, res) => {
  const { cours } = req.body;

  try {
    const sessions = await Session.findAll({
      include: {
        model: Cours,
        required: true,
        include: {
          model: Provider,
		required:true
        },
        where: {
          id: cours,
        },
      },
      where: { SocieteId: req.societe },
    });
    return res.json(sessions);
  } catch (err) {
    console.log(err);
    return res.send({ status: "error" });
  }
};

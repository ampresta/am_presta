const sequelize = require("sequelize");
const db = require("../../config/database");
const { Quota, Cours, Session } = db.models;
module.exports = async (req, res) => {
  const { cours, nom, datefin, datedebut } = req.body;
  if (!nom || !datedebut || !datefin || !cours) {
    return res.sendStatus(403);
  }
  try {
    const courss = await Cours.findByPk(cours);
    const q = Quota.count({
      where: {
        [sequelize.Op.and]: {
          SocieteId: req.societe,
          ProviderId: courss.ProviderId,
        },
      },
    });
    if (q == 0) {
      return res.send({
        status: false,
        msg: "You're not allowed",
      });
    }
  } catch (err) {
    console.log(err);
    return res.sendStatus(403);
  }

  try {
    Session.create({
      nom,
      datefin,
      datedebut,
      statut: true,
      CourId: cours,
      SocieteId: req.societe,
    });
    return res.send({ status: "true", msg: "Session Created" });
  } catch (err) {
    return res.send({ status: "false", msg: "Error" });
  }
};

const sequelize = require("sequelize");
const db = require("../../config/database");
const { Quota, Cours, Session } = db.models;
module.exports = async (req, res) => {
  const { soc, cours, nom, datefin, datedebut } = req.body;
  if (!nom || !datedebut || !datefin || !cours || !soc) {
    return res.sendStatus(403);
  }
  try {
    const courss = await Cours.findByPk(cours);
    const q = Quota.count({
      where: {
        SocieteId: soc,
        ProviderId: courss.ProviderId,
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
      SocieteId: soc,
    });
    return res.send({ status: "true", msg: "Session Created" });
  } catch (err) {
    return res.send({ status: "false", msg: "Error" });
  }
};

const sequelize = require("sequelize");
const db = require("../../config/database");
const { Quota, Session } = db.models;
module.exports = async (req, res) => {
  const { cours, nom, datefin, datedebut, societe } = req.body;
  if (!nom || !datedebut || !datefin || !societe) {
    return res.sendStatus(403);
  }
  const q = Quota.count({
    where: { [sequelize.Op.and]: { SocieteId: req.societe, CourId: cours } },
  });
  if (q == 0) {
    return res.send({
      status: false,
      msg: "You're not allowed",
    });
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

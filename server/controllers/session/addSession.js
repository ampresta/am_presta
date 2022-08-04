const db = require("../../config/database");
const { Session } = db.models;
module.exports = async (req, res) => {
  const { cours, nom, datefin, datedebut, societe } = req.body;
  if (!cours || !nom || !datedebut || !datefin || !societe) {
    return res.sendStatus(403);
  }
  try {
    Session.create({
      nom,
      datefin,
      datedebut,
      statut: true,
      CourId: cours,
      SocieteId: societe,
    });
    return res.send({ status: "true", msg: "Session Created" });
  } catch (err) {
    return res.send({ status: "false", msg: "Error" });
  }
};

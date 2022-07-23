const Session = require("../../models/Session");

module.exports = async (req, res) => {
  const { cours, nom, datefin, datedebut, statut } = req.body;
  if (!cours || !nom || !datedebut || !datefin || statut) {
    return res.sendStatus(403);
  }
  try {
    Session.create({ nom, datefin, datedebut, statut, CourId: cours });
    return res.send({ status: "true", msg: "Session Created" });
  } catch (err) {
    return res.send({ status: "false", msg: "Error" });
  }
};

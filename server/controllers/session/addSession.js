const Session = require("../../models/Session");

module.exports = async (req, res) => {
  const { cours, nom, datefin, datedebut } = req.body;
  if (!cours || !nom || !datedebut || !datefin) {
    return res.sendStatus(403);
  }
  try {
    Session.create({ nom, datefin, datedebut, statut: true, CourId: cours });
    return res.send({ status: "true", msg: "Session Created" });
  } catch (err) {
    return res.send({ status: "false", msg: "Error" });
  }
};

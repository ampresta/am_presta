const Departement = require("../../models/Departement");

module.exports = async (req, res) => {
  try {
    const { nom, societe } = req.body;

    if (!nom || !societe) {
      return res.sendStatus(403);
    }
    const departement = await Departement.create({ nom, id: societe });
  } catch (err) {
    console.log(err);
    return res.sendStatus(403);
  }
  return res.send({ status: true, msg: "Departement Created Successfully" });
};

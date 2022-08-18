const db = require("../../config/database");
const { Voucher, Societe, Provider } = db.models;
module.exports = async (req, res) => {
  const { societe, code, provider } = req.body;
  if (!societe || !provider || !code) {
    return res.sendStatus(403);
  }
  try {
    const prov = await Provider.findOne({
      where: { nom: provider },
    });
    if (!prov) {
      return res.send({ status: false, msg: "Provider Not  Found" });
    }

    const soc = await Societe.findOne({
      where: { name: societe },
    });
    if (!soc) {
      return res.send({ status: false, msg: "Company Not  Found" });
    }

    await Voucher.create({
      SocieteId: soc.id,
      code: code,
      ProviderId: prov.id,
    });
  } catch (err) {
    console.log(err);
    return res.send({ status: false });
  }
  return res.send({ status: true, msg: "Done" });
};

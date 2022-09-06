const db = require("../../config/database");
const { Societe } = db.models;

module.exports = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.sendStatus(403);
  }
  try {
    await Societe.restore({ where: { id } });
  } catch (err) {
    console.log(err);
    return res.sendStatus(403);
  }

  return res.send({ status: true, msg: "Societe Restored Successfully" });
};

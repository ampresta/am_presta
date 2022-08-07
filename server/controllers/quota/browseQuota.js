const db = require("../../config/database");
const { Quota, Societe, Provider } = db.models;
module.exports = async (req, res) => {
  const { societe } = req.body;
  if (!societe) {
    return res.sendStatus(403);
  }
  const quotas = await Quota.findAll({
    include: [
      {
        model: Societe,
        where: { id: societe },
      },
      {
        model: Provider,
      },
    ],
  });
  return res.send({
    status: true,
    quotas,
  });
};

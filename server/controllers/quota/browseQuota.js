const db = require("../../config/database");
const { Quota, Societe, Provider } = db.models;
module.exports = async (req, res) => {
  const quotas = await Quota.findAll({
    include: [
      {
        model: Societe,
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

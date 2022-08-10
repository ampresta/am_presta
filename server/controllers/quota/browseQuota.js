const db = require("../../config/database");
const { Quota, Societe, Provider } = db.models;
module.exports = async (req, res) => {
  const quotas = await Quota.findAll({
    include: [
      {
        model: Societe,
        required: true,
      },
      {
        model: Provider,
        required: true,
      },
    ],
  });
  return res.send({
    status: true,
    quotas,
  });
};

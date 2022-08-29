const sequelize = require("../../config/database");

const { Quota, Provider } = sequelize.models;
module.exports = async (req, res) => {
  const quota = await Quota.findAll({
    attributes: ["quota"],
    where: {
      SocieteId: req.societe,
    },
    include: {
      model: Provider,
      attributes: ["nom"],
    },
  });
  const providers = [];
  const quotas = [];
  quota.forEach((e) => {
    providers.push(e.Provider.nom);
    quotas.push(e.quota);
  });
  return res.send({ status: true, providers, quotas });
};

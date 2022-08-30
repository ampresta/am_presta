const db = require("../../config/database");
const { Collaborateur, Quota, Societe, Provider } = db.models;
module.exports = async (req, res) => {
  const { SocieteId } = req.body;
  if (!SocieteId) {
    return res.status(403);
  }
  // const quotas = await Quota.findAll({
  //   include: [
  //     {
  //       model: Societe,
  //       required: true,
  //       include: {
  //         model: Collaborateur,
  //         attributes: [],
  //         where: {
  //           admin: true,
  //         },
  //       },
  //     },
  //     {
  //       model: Provider,
  //       required: true,
  //     },
  //   ],
  // });
  const quotas = await Provider.findAll({
    attributes: ["id", "nom"],
    include: {
      model: Quota,
      required: false,
      where: {
        SocieteId,
      },
      attributes: ["id", "quota"],
    },
  });
  return res.send(quotas);
};

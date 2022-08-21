const sequelize = require("../../config/database");
const { Provider, Quota, Cours, Collaborateur } = sequelize.models;
module.exports = async (req, res) => {
  const { provider } = req.body;
  if (provider) {
    filters = {
      include: {
        model: Provider,
        attributes: ["nom"],
        required: true,
        include: {
          model: Quota,
          required: false,
          where: {
            SocieteId: collab.SocieteId,
          },
        },
      },
    };
  }
  const collab = await Collaborateur.findOne({
    where: { id: req.collab },
  });
  if (!collab) {
    console.log("\x1b[42mCOLLAB\x1b[0m");
    console.log(req.collab);
    return res.send({ status: false, msg: "Collab Not found" });
  }
  const cours = await Cours.findAll({
    include: {
      model: Provider,
      attributes: ["nom"],
      required: true,
      include: {
        model: Quota,
        required: false,
        where: {
          SocieteId: collab.SocieteId,
        },
      },
    },
  });
  return res.send({ status: true, cours });
};

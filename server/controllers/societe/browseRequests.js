const sequelize = require("../../config/database");

const { Collaborateur, Cours } = sequelize.models;
module.exports = async (req, res) => {
  collabs = await Collaborateur.findAll({
    include: {
      model: Cours,
      required: true,
    },
    where: {
      SocieteId: req.societe,
    },
  });
  return res.send(collabs);
};

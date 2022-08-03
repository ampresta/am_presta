const Societe = require("../../models/Societe");
const sequelize = require("sequelize");

module.exports = async (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.sendStatus(403)
    }
  const id = await Societe.findOne({
    where: {
      name,
    },
    attributes: ["id"],
  });

  return id !== null ?  res.json(id) :  res.json({});
};

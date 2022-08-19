const sequelize = require("../../config/database");
const { Societe } = sequelize.models;
module.exports = async (req, res) => {
  try {
    console.log("\x1b[36mLOG:\x1b[0m");
    console.log(req.societe);
    const soc = await Societe.findOne({
      where: {
        id: req.societe,
      },
    });
    return res.send({ status: true, img: soc.image });
  } catch (err) {
    console.log(err);
    return res.send({ status: false });
  }
};

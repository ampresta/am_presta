const sequelize = require("../../config/database");
const { Request } = sequelize.models;
module.exports = async (req, res) => {
  const { id } = req.body;
  const request = await Request.findOne({
    where: { id },
  });
  if (!request) {
    return res.send({ status: false });
  }
  request.status = "refused";
  await request.save();

  return res.send({ status: true });
};

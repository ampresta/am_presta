const sequelize = require("sequelize");
const db = require("../../config/database");
const { Voucher, Provider, Societe } = db.models;

module.exports = async (req, res) => {
  try {
    const vouchers = await Voucher.findAll({
      attributes: ["id", "code"],
      include: [
        {
          model: Provider,
          attributes: ["id", "nom", "image"],
        },
      ],
      where: {
        SessionCollabId: null,
        SocieteId: req.societe,
      },
      order: [["Provider", "id"]],
    });
    return res.send(vouchers);
  } catch {
    return res.send({ status: false });
  }
};

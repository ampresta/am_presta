const { Op } = require("sequelize");

const db = require("../../config/database");
const { Session_Collab, Voucher } = db.models;
module.exports = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.sendStatus(403);
  }
  try {
    const sess_collab = await Session_Collab.findByPk(id, {
      where: {
        SocieteId: req.societe,
      },
      include: {
        model: Proof,
        as: "fincourse",
        where: {
          status: true,
        },
      },
    });
    const v = await Voucher.findOne({
      where: {
        Session_CollabId: {
          [Op.is]: null,
        },
        SocieteId: req.societe,
      },
    });
    v.Session_CollabId = sess_collab.id;
    return res.send({ status: true, msg: "Done" });
  } catch (err) {
    console.log(err);
    return res.send({ status: false });
  }
};

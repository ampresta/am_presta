const { Op } = require("sequelize");
const db = require("../../config/database");
const { Session_Collab, Voucher, Proof, Session, Cours } = db.models;
module.exports = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.sendStatus(403);
  }
  try {
    const sess_collab = await Session_Collab.findAll({
      where: {
        SessionId: id,
        $Voucher$: null,
      },
      include: [
        {
          model: Voucher,
          required: false,
        },
        {
          model: Proof,
          as: "fincourse",
          where: {
            status: true,
          },
        },
        {
          model: Session,
          required: true,
          attributes: ["id"],
          include: {
            model: Cours,
            required: true,
            attributes: ["ProviderId"],
          },
        },
      ],
    });
    if (!sess_collab) {
      return res.send({
        status: false,
        msg: "No User Compeleted course",
      });
    }
    let i = 0;
    for (const collab of sess_collab) {
      const v = await Voucher.findOne({
        where: {
          SessionCollabId: {
            [Op.is]: null,
          },
          SocieteId: req.societe,
          ProviderId: collab.Session.Cour.ProviderId,
        },
      });
      if (!v) {
        return res.send({
          status: false,
          msg: `No more Vouchers.Only ${i} Vouchers Assigned]`,
        });
      }
      v.SessionCollabId = collab.id;
      await v.save();
      i++;
    }
    return res.send({ status: true, msg: "Done" });
  } catch (err) {
    console.log("\x1b[46m\x1b[41mERROR\x1b[0m");
    console.log(err);
    return res.send({ status: false });
  }
};

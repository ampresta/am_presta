const { Op } = require("sequelize");
const db = require("../../config/database");
const { Cours, Collaborateur, Request, Session, Quota, Provider } = db.models;
module.exports = async (req, res) => {
  const { session, collab, request } = req.body;
  if (!session || !collab) {
    return res.sendStatus(403);
  }

  try {
    const sess = await Session.findByPk(session, {
      where: {
        SocieteId: req.societe,
      },
      include: [
        {
          model: Cours,
          required: true,
          include: [
            {
              model: Provider,
              required: true,
              include: [
                {
                  model: Quota,
                  required: true,
                  where: {
                    SocieteId: req.societe,
                    quota: {
                      [Op.gt]: 0,
                    },
                  },
                },
              ],
            },
          ],
        },
      ],
    });
    // console.log("\x1b[41mHHHHllllHHHHHHHHH\x1b[0m");
    console.log(sess.Cour.Provider.Quota[0].quota);
    const collabo = await Collaborateur.findByPk(collab, {
      where: {
        id: collab,
        SocieteId: req.societe,
      },
    });
    sess.addCollaborateur(collabo);
    sess.Cour.Provider.Quota[0].quota--;
    sess.Cour.Provider.Quota[0].save();
    if (request) {
      Request.destroy({
        where: {
          CourId: sess.CourId,
          CollaborateurId: collab,
        },
      });
    }

    return res.send({ status: true, msg: "Collab Added" });
  } catch (err) {
    console.log(err);
    return res.send({ status: false, msg: "Check your quota" });
  }
};

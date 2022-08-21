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
    const collabo = await Collaborateur.findOne({
      where: {
        id: collab,
        SocieteId: req.societe,
      },
    });
    if (!collabo) {
      return res.send({
        status: false,
        msg: "Collab Doesn't exist in your company",
      });
    }
    sess.addCollaborateur(collabo);
    sess.Cour.Provider.Quota[0].quota--;
    sess.Cour.Provider.Quota[0].save();
    if (request) {
      const req = await Request.findOne({
        where: {
          CourId: sess.CourId,
          CollaborateurId: collab,
        },
      });
      req.status = true;
      await req.save();
    }

    return res.send({ status: true, msg: "Collab Added" });
  } catch (err) {
    console.log(err);
    return res.send({ status: false, msg: "Check your quota" });
  }
};

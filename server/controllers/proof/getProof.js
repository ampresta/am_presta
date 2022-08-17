const db = require("../../config/database");
const { Session_Collab, Proof } = db.models;
module.exports = async (req, res) => {
  const { sess, collab } = req.body;
  if (!sess || !collab) {
    return res.sendStatus(403);
  }

  try {
    const sess_collab = await Session_Collab.findOne({
      where: { SessionId: sess, CollaborateurId: collab },
      include: [
        {
          model: Proof,
          as: "certifs",
        },
        {
          model: Proof,
          as: "fincourse",
        },
      ],
    });
    return res.send({ status: true, data: sess_collab });
  } catch (err) {
    return res.send({ status: false });
  }
};

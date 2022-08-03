const Session_Collab = require("../../models/Session_Collab");

module.exports = async (req, res) => {
  const { session, collab } = req.body;
  if (!session || !collab) {
    return res.sendStatus(403);
  }
  try {
    row = await Session_Collab.findOne({
      where: { SessionId: session, CollaborateurId: collab },
    });
    row.status = 1;
    row.save();
    return res.send({ status: true, msg: "Good" });
  } catch (err) {
    console.log(err);
    return res.send({ status: false });
  }
};

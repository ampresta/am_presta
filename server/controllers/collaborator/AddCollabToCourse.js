const Collaborateur = require("../../models/Collaborateur");
const Session = require("../../models/Session");

module.exports = async (req, res) => {
  const { session, collab } = req.body;
  if (!session || !collab) {
    return res.sendStatus(403);
  }

  try {
    sess = await Session.findByPk(session);
    sess.addCollaborateur(collab);
    return res.send({ status: true, msg: "Collab Added" });
  } catch (err) {
    return res.send({ status: false, err });
  }
};

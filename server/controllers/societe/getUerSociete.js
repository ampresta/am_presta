const db = require("../../config/database");
const { Collaborateur } = db.models;
module.exports = async (req, res) => {
  const { UserId } = req.body;
  if (!UserId) {
    return res.sendStatus(403);
  }
  // try {
  const collab = await Collaborateur.findOne({ where: { UserId } });
  // } catch (err) {
  // return res.send({ status: "fail", msg: err });
  // }
  return res.send({ status: "done", societe: collab.SocieteId });
};

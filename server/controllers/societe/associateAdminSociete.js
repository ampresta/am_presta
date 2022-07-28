db = require("../../config/database");
module.exports = async (req, res) => {
  const { societe, collab } = req.body;
  try {
    collab = await db.finOne({ where: { id: collab } });
    collab.SocieteId = societe;
    collab.admin = true;
    await collab.save();
  } catch (err) {
    return res.send({ status: "fail", msg: err });
  }
  return res.send({ status: "done", msg: "done" });
};

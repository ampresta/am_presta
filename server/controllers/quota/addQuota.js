const db = require("../../config/database");
const { Quota } = db.models;
module.exports = async (req, res) => {
  const { quota, societe, cours } = req.body;
  if (!cours || !quota || !societe) {
    return res.sendStatus(403);
  }
  try {
    Quota.create({
      SocieteId: societe,
      CoursId: cours,
      quota: quota,
    });
    return res.json({ status: true, message: "Quota added" });
  } catch {
    return res.sendStatus(403);
  }
};

const db = require("../../config/database");
const { Quota } = db.models;
module.exports = async (req, res) => {
  const { quotas } = req.body;

  if (!quotas) {
    return res.json({ status: false, message: "No parameters passed" });
  }
  try {
    Quota.update({ quota: quota }, { where: { id: id } });
    return res.json({ status: true, message: "update Done" });
  } catch {
    return res.json({ status: false, message: "error in update" });
  }
};

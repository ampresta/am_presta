const db = require("../../config/database");
const { Quota } = db.models;
module.exports = async (req, res) => {
  const { quotas } = req.body;
  if (!quotas) {
    return res.sendStatus(403);
  }
  try {
    for (quota of quotas) {
      console.log(quota);

      Quota.create({
        SocieteId: quota.societe,
        ProviderId: quota.provider,
        quota: quota.quota,
      });
    }
  } catch {
    return res.send({ status: false, msg: "Shiiitee" });
  }
  return res.send({ status: true, msg: "Done" });
};

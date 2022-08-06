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

      Quota.update(
        {
          quota: quota.quota,
        },
        { where: { SocieteId: quota.societe, CourId: quota.cours } }
      );
    }
  } catch {
    return res.send({ status: false, msg: "Shiiitee" });
  }
  return res.send({ status: true, msg: "Done" });
};

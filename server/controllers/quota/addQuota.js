const sequelize = require("../../config/database");
const db = require("../../config/database");
const { Quota } = db.models;
module.exports = async (req, res) => {
  const { quotas } = req.body;
  if (!quotas) {
    return res.sendStatus(403);
  }
  try {
    // Quota.bulkCreate(quota)
    const result = await sequelize.transaction(async (t) => {
      const promises = [];
      for (const quota of quotas) {
        console.log(quota);
        if (quota.quota > 0) {
          const [created, b] = await Quota.upsert(
            {
              SocieteId: quota.societe,
              ProviderId: quota.provider,
              quota: quota.quota,
            },
            {
              transaction: t,
            }
          );
          if (created.deletedAt) {
            await created.restore({
              transaction: t,
            });
          }
          // console.log(created);
          promises.push(created);
        } else {
          const q = await Quota.destroy({
            where: {
              SocieteId: quota.societe,
              ProviderId: quota.provider,
              // force: true,
            },
            transaction: t,
          });
          promises.push(q);
        }
      }
      return Promise.all(promises);
    });
  } catch (err) {
    console.log(err);
    return res.send({ status: false, msg: "error" });
  }
  return res.send({ status: true, msg: "Done" });
};

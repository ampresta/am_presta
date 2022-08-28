const sequelize = require("sequelize");
const db = require("../../config/database");

const { Notifications_object, Notification_change } = db.models;

module.exports = async (req, res) => {
  const { notifId } = req.body;

  if (!notifId) {
    return res.status(403);
  }
  try {
    const notif = await Notifications_object.findByPk(notifId);
    notif.read = true;
    await notif.save();

    return res.send({ status: true });
  } catch (error) {
    console.log(error);
    return res.send({ status: false });
  }
};

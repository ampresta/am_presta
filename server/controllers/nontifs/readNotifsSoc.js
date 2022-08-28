const sequelize = require("sequelize");
const db = require("../../config/database");

const { Notifications_object, Notification_change } = db.models;

module.exports = async (req, res) => {
  const { SocieteId } = req.body;
  if (!SocieteId) {
    return res.status(403);
  }
  try {
    Notifications_object.findAll({
      include: {
        model: Notification_change,
        where: { SocieteId },
      },
    }).then((notifs) => {
      if (notifs) {
        notifs.map(async (notif) => {
          notif.read = true;
          await notif.save();
        });
      }
    });

    return res.send({ status: true });
  } catch (error) {
    console.log(error);
    return res.send({ status: false });
  }
};

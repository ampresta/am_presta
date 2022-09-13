const db = require("../../config/database");

const { Notifications_object, Notification_change, Collaborateur } = db.models;

module.exports = async (req, res) => {
  const { societe } = req;
  if (!societe) {
    return res.status(403);
  }
  try {
    const recepteur = await Collaborateur.findOne({
      where: {
        SocieteId: societe,
        admin: true,
      },
    });
    Notifications_object.findAll({
      include: {
        model: Notification_change,
        where: { recepteurId: recepteur.id },
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

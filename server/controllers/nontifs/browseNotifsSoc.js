const sequelize = require("sequelize");
const db = require("../../config/database");

const {
  Notifications_object,
  Notification_change,
  Notifications_Entity,
  Collaborateur,
  Provider,
  Proof,
  Session,
  Voucher,
  Request,
} = db.models;

module.exports = async (req, res) => {
  try {
    const notifs = await Notifications_object.findAll({
      // attributes: ["NotificationsEntityEntityTypeId", ],
      include: [
        {
          model: Notification_change,
          attributes: ["id"],
          // include: {
          //   model: Collaborateur,
          //   attributes: ["nom", "prenom"],
          // },
          where: {
            SocieteId: 1,
          },
        },
        // {
        //   model: Notifications_Entity,
        // },
        {
          model: Provider,
        },
        {
          model: Session,
        },
        {
          model: Voucher,
        },
        {
          model: Proof,
        },
        {
          model: Request,
        },
      ],
    });
    return res.send(notifs);
  } catch (error) {
    console.log(error);
    return res.send({ status: false });
  }
};

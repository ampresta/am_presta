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
      attributes: ["id"],
      include: [
        {
          model: Notification_change,
          attributes: ["id"],
          include: {
            model: Collaborateur,
            attributes: ["nom", "prenom"],
          },
          where: {
            SocieteId: 1,
          },
        },
        {
          model: Notifications_Entity,
          attributes: ["entity", "description"],
        },
        {
          model: Provider,
          attributes: ["nom", "image"],
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
      where: {
        read: false,
      },
    });
    return res.send(notifs);
  } catch (error) {
    console.log(error);
    return res.send({ status: false });
  }
};

const Sequelize = require("sequelize");
const io = require("../socket").get();

const Provider = (db) => {
  db.define(
    "Provider",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      nom: {
        type: Sequelize.STRING,
      },
      image: {
        type: Sequelize.STRING,
      },
    },
    {
      hooks: {
        afterCreate: async (provider, options) => {
          const db = require("../config/database");
          const { Notification_change, Notifications_object } = db.models;
          const notif = await Notifications_object.create(
            {
              ProviderId: provider.id,
              Notification_change: {
                actorId: 1,
                SocieteId: 1,
              },
            },
            {
              include: [
                {
                  association: Notifications_object.Notification_change,
                  include: [Notifications_object.Notification_change],
                },
              ],
            }
          );
          io.emit("notif", "test");
        },
      },
      Sequelize,
      paranoid: true,
      deletedAt: "deletedAt",
    }
  );
};
module.exports = Provider;

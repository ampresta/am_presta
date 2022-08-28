const Sequelize = require("sequelize");
const io = require("../socket").get();

const Request = (db) => {
  db.define(
    "Request",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: "pending",
        validate: {
          inside: (value) => {
            const enums = ["accepted", "pending", "refused"];
            if (!enums.includes(value)) {
              throw new Error("not a valid option");
            }
          },
        },
      },
    },
    {
      hooks: {
        afterCreate: async (request, options) => {
          const { CollaborateurId } = request;
          const db = require("../config/database");
          const {
            Notification_change,
            Notifications_object,
            Notifications_Entity,
            Collaborateur,
          } = db.models;
          const { entity_type_id } = await Notifications_Entity.findOne({
            attributes: ["entity_type_id"],
            where: {
              description: "Collab sent Request to enroll to course",
            },
          });

          const { SocieteId } = await Collaborateur.findByPk(CollaborateurId);

          await Notifications_object.create(
            {
              RequestId: request.id,
              NotificationsEntityEntityTypeId: entity_type_id,
              Notification_change: {
                actorId: CollaborateurId,
                SocieteId: SocieteId,
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
          io.emit("notif");
        },
        afterUpdate: async (request, options) => {
          const { status } = request;
          const { CollaborateurId } = request;
          const db = require("../config/database");
          const {
            Notification_change,
            Notifications_object,
            Notifications_Entity,
            Collaborateur,
          } = db.models;

          const { SocieteId } = await Collaborateur.findByPk(CollaborateurId);

          let description;
          if (status == "accepted") {
            description = "Request accepted";
          } else if (status == "refused") {
            description = "Request refused";
          }
          const { entity_type_id } = await Notifications_Entity.findOne({
            attributes: ["entity_type_id"],
            where: {
              description,
            },
          });

          await Notifications_object.create(
            {
              RequestId: request.id,
              NotificationsEntityEntityTypeId: entity_type_id,
              Notification_change: {
                actorId: CollaborateurId,
                SocieteId: SocieteId,
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
          console.log("=================================");
          console.log("=================================");
          console.log("=================================");
          console.log("created");
          console.log("=================================");
          console.log("=================================");
          console.log("=================================");
          io.emit("notif");
        },
      },
      Sequelize,
      paranoid: true,
      deletedAt: "deletedAt",
    }
  );
};
module.exports = Request;

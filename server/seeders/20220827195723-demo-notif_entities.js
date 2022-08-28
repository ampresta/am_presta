"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Notifications_Entities",
      [
        {
          entity: "Cours",
          description: "Course added",
          createdAt: "2022-02-12",
          updatedAt: new Date(),
        },
        {
          entity: "Cours",
          description: "Course removed",
          createdAt: "2022-02-12",
          updatedAt: new Date(),
        },
        {
          entity: "Cours",
          description: "Course updated",
          createdAt: "2022-02-12",
          updatedAt: new Date(),
        },
        {
          entity: "Voucher",
          description: "Voucher asigned to collab",
          createdAt: "2022-02-12",
          updatedAt: new Date(),
        },
        {
          entity: "Voucher",
          description: "Voucher added to societe",
          createdAt: "2022-02-12",
          updatedAt: new Date(),
        },
        {
          entity: "Request",
          description: "Collab sent Request to enroll to course",
          createdAt: "2022-02-12",
          updatedAt: new Date(),
        },
        {
          entity: "Request",
          description: "Request accepted",
          createdAt: "2022-02-12",
          updatedAt: new Date(),
        },
        {
          entity: "Request",
          description: "Request refused",
          createdAt: "2022-02-12",
          updatedAt: new Date(),
        },
        {
          entity: "Request",
          description: "Request refused",
          createdAt: "2022-02-12",
          updatedAt: new Date(),
        },
        {
          entity: "Session",
          description: "Collab added to Session ",
          createdAt: "2022-02-12",
          updatedAt: new Date(),
        },
        {
          entity: "Proof",
          description: "Collab uploaded course completion",
          createdAt: "2022-02-12",
          updatedAt: new Date(),
        },
        {
          entity: "Proof",
          description: "Collab uploaded certification",
          createdAt: "2022-02-12",
          updatedAt: new Date(),
        },
        {
          entity: "Proof",
          description: "Course completion accepted",
          createdAt: "2022-02-12",
          updatedAt: new Date(),
        },
        {
          entity: "Proof",
          description: "Certification accepted",
          createdAt: "2022-02-12",
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};

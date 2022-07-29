"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Collaborateurs",
      [
        {
          nom: "Jannat",
          prenom: "Mbappe",
          email: "aazaz@zaaz.fr",
          admin: true,
          instructor: false,
          SocieteId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nom: "Jannat",
          prenom: "Mbappe2",
          email: "aazaz@zaaz.fr",
          admin: true,
          instructor: false,
          SocieteId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
    await queryInterface.bulkInsert(
      "Societes",
      [
        {
          name: "Jannat",
          createdAt: "2022-08-12",
          updatedAt: new Date(),
        },
        {
          name: "Jannat2",
          createdAt: "2022-03-12",
          updatedAt: new Date(),
        },

        {
          name: "Jannat5",
          createdAt: "2022-01-12",
          updatedAt: new Date(),
        },
        {
          name: "Jannat28",
          createdAt: "2022-06-12",
          updatedAt: new Date(),
        },
        {
          name: "Jannat200",
          createdAt: "2022-07-12",
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

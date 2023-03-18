'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Region',
      [
        {
          title: 'World',
        },
        {
          title: 'Europe',
        },
        {
          title: 'Asia',
        },
        {
          title: 'North America',
        },
        {
          title: 'South America',
        },
      ],
      {},
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

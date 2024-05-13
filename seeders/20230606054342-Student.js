'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    return queryInterface.bulkInsert('Students', [
      {
        name: 'Ahmad',
        nim: 123456789,
        classmate: 'A',
        major: 'Teknik Informatika',
        start_year: '2019',
        favourite_lessons: ['Pemrograman Dasar', 'Pemrograman Lanjut']
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Students', null, {})
  }
}

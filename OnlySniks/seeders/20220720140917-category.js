'use strict';
let category = require("../dummy/category.json")

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
   category.forEach(el => {
    el.createdAt = new Date()
    el.updatedAt = new Date()
   })

   return queryInterface.bulkInsert('Categories', category)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return queryInterface.bulkDelete('Categories', null)
  }
};

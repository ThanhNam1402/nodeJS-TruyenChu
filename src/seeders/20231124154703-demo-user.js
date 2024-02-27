'use strict';


// tao du lieu trong sequelize 

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      email: 'admin@gmail.com',
      password : '121212',
      firstName: 'John',
      lastName: 'Doe',
      adress : 'Users',
      gender : 1,
      rodeID : 1,
      image : 'textrrrrrrrrrrr',
      phoneNumber : '121212',
      positionId : '',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};

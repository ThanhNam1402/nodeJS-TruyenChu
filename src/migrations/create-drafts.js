'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Drafts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      draftName: {
        type: Sequelize.STRING
      },
      content: {
        type: Sequelize.TEXT
      },
      bookID: {
        type: Sequelize.STRING
      },
      userID: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });


  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Drafts');
  }
};
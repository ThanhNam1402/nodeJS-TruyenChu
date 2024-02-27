'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('allcodes', 'valueEn', 'name');
  },

  down: (queryInterface, Sequelize) => {
    // return queryInterface.renameColumn('tableName', 'tour_name', 'tour_title');
  }
};

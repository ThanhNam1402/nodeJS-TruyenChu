'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BookCategories extends Model {

    static associate(models) {
      // BookCategories.belongsTo(models.Book, { foreignKey: 'categoryID'})

    }
  };
  BookCategories.init({
    name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'BookCategories',
  });
  return BookCategories;
};
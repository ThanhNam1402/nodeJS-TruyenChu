'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {

    static associate(models) {
      Book.hasMany(models.Draft, { foreignKey: 'bookID' });
    }
  };
  Book.init({
    name: DataTypes.STRING,
    content: DataTypes.STRING,
    categoryID: DataTypes.INTEGER,
    userID: DataTypes.INTEGER,
    world: DataTypes.INTEGER,
    character: DataTypes.INTEGER,
    poetry: DataTypes.INTEGER,
    school: DataTypes.INTEGER,
    thumbnail: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {

    static associate(models) {
      Book.hasMany(models.Draft, { foreignKey: 'bookID' });
    }

    static associate(models) {
      Book.belongsTo(models.Users);
    }

  };
  Book.init({
    name: DataTypes.STRING,
    content: DataTypes.STRING,
    categoryID: DataTypes.INTEGER,
    userID: DataTypes.INTEGER,
    world: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    character: DataTypes.INTEGER,
    poetry: DataTypes.INTEGER,
    school: DataTypes.INTEGER,
    state: DataTypes.INTEGER,
    thumbnail: DataTypes.STRING,
    publishAt : DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};
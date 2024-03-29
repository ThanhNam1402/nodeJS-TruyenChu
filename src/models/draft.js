'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Draft extends Model {

    static associate(models) {
      Draft.belongsTo(models.Book);
    }
  };
  Draft.init({
    userID: DataTypes.INTEGER,
    content: DataTypes.STRING,
    draftName: DataTypes.STRING,
    bookID: DataTypes.STRING,
    status: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Draft',
  });
  return Draft;
};
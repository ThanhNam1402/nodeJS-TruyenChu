'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CMTopic extends Model {

    static associate(models) {
      CMTopic.belongsTo(models.Users);

      // CMTopic.hasMany(models.chilrenCMTopic, {
      //   foreignKey: 'commentID'
      // });
    }

  };




  CMTopic.init({
    topicID: DataTypes.INTEGER,
    userID: DataTypes.INTEGER,
    content: DataTypes.STRING,
    parentID: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'CMTopic',
  });
  return CMTopic;
};
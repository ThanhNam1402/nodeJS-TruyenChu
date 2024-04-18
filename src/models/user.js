'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      Users.hasMany(models.Book, {
        foreignKey: 'userID'
      });
    }

  };
  Users.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    gender: DataTypes.BOOLEAN,
    roleId: DataTypes.STRING,
    image: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    token: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};
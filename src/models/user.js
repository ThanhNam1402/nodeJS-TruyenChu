'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {

    static associate(models) {

    }
  };
  Users.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    adress : DataTypes.STRING,
    gender : DataTypes.BOOLEAN,
    roleId : DataTypes.STRING,
    image : DataTypes.STRING,
    phoneNumber : DataTypes.STRING,
    positionId : DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};
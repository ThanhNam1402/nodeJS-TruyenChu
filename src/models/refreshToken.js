'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class RFToken extends Model {
        static associate(models) {
        }
    };
    RFToken.init({
        userID: DataTypes.INTEGER,
        token: DataTypes.STRING,
        expires: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'RFToken',
    });
    return RFToken;
};
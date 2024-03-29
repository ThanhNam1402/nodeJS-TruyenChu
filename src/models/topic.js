'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Topic extends Model {

    };
    Topic.init({
        name: DataTypes.INTEGER,
        content: DataTypes.STRING,
        slug: DataTypes.STRING,
        userID: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Topic',
    });
    return Topic;
};
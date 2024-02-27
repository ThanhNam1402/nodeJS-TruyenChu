'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Books', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING
            },
            content: {
                type: Sequelize.STRING
            },
            categoryID: {
                type: Sequelize.INTEGER
            },
            userID: {
                type: Sequelize.INTEGER
            },
            world: {
                type: Sequelize.INTEGER
            },
            character: {
                type: Sequelize.INTEGER
            },
            poetry: {
                type: Sequelize.INTEGER
            },
            school: {
                type: Sequelize.INTEGER
            },
            thumbnail: {
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });

       
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Books');
    }
};
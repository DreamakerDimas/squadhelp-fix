'use strict';
const uuid = require('uuid/v4');
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Conversations', {
      _id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: () => uuid(),
        allowNull: false,
      },
      participants: {
        allowNull: false,
        type: Sequelize.ARRAY(Sequelize.INTEGER),
      },
      blackList: {
        type: Sequelize.ARRAY(Sequelize.BOOLEAN),
        defaultValue: [false, false],
      },
      favoriteList: {
        type: Sequelize.ARRAY(Sequelize.BOOLEAN),
        defaultValue: [false, false],
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Conversations');
  },
};

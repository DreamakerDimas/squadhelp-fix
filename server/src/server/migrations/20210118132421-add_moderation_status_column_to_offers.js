'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('Offers', 'moderationStatus', {
      type: Sequelize.ENUM('pending', 'checked', 'rejected'),
      defaultValue: 'pending',
    });
  },

  down: function (queryInterface) {
    return queryInterface.removeColumn('Offers', 'moderationStatus');
  },
};

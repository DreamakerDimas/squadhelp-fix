'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Contests', // table name
      'domain', // new field name
      {
        type: Sequelize.ENUM('asname', 'yes', 'no'),
        allowNull: false,
        defaultValue: 'yes', // only for existing contests
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Contests', 'domain');
  },
};

'use strict';
module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(
      'ALTER TYPE "enum_Users_role" ADD VALUE \'moderator\';'
    );
  },
  down: (queryInterface, Sequelize) => {
    var query =
      'DELETE FROM pg_enum ' +
      "WHERE enumlabel = 'moderator' " +
      'AND enumtypid = ( SELECT oid FROM pg_type WHERE typname = "enum_Users_role")';
    return queryInterface.sequelize.query(query);
  },
};

'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('CatalogsToConversations', {
      conversationId: {
        type: Sequelize.UUID,
        references: {
          model: 'Conversations',
          key: '_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      catalogId: {
        type: Sequelize.UUID,
        references: {
          model: 'Catalogs',
          key: '_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('CatalogToConversations');
  },
};

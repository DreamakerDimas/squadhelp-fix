'use strict';

module.exports = (sequelize, DataTypes) => {
  const CatalogToConversation = sequelize.define(
    'CatalogsToConversations',
    {},
    {
      timestamps: false,
    }
  );

  return CatalogToConversation;
};

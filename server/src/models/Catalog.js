'use strict';
const uuid = require('uuid/v4');

module.exports = (sequelize, DataTypes) => {
  const Catalog = sequelize.define(
    'Catalogs',
    {
      _id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: () => uuid(),
      },
      catalogName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: false,
    }
  );

  return Catalog;
};

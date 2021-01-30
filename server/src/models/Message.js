'use strict';
const uuid = require('uuid/v4');

module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define(
    'Messages',
    {
      _id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: () => uuid(),
      },
      body: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: true,
    }
  );

  return Message;
};

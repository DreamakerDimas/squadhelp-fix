'use strict';
const uuid = require('uuid/v4');

module.exports = (sequelize, DataTypes) => {
  const Conversation = sequelize.define('Conversations', {
    _id: {
      primaryKey: true,
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: () => uuid(),
    },
    participants: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
    },
    blackList: {
      type: DataTypes.ARRAY(DataTypes.BOOLEAN),
      defaultValue: [false, false],
    },
    favoriteList: {
      type: DataTypes.ARRAY(DataTypes.BOOLEAN),
      defaultValue: [false, false],
    },
  });

  return Conversation;
};

'use strict';
module.exports = (sequelize, DataTypes) => {
  const Conversation = sequelize.define('Conversation', {
    itemId: DataTypes.INTEGER,
    senderId: DataTypes.INTEGER,
    receiverId: DataTypes.INTEGER
  }, {});
  Conversation.associate = function(models) {
    Conversation.hasMany(models.Message, {foreignKey: 'conversationId'});
  };
  return Conversation;
};
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    conversationId: DataTypes.INTEGER,
    text: DataTypes.STRING
  }, {});
  Message.associate = function(models) {
    Message.belongsTo(models.conversation, {
      onDelete: "CASCADE",
      foreignKey: 'conversationId' 
    });
  };
  return Message;
};
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define('Notification', {
    senderId: DataTypes.INTEGER,
    receiverId: DataTypes.INTEGER
  }, {});
  Notification.associate = function(models) {
    // associations can be defined here
  };
  return Notification;
};
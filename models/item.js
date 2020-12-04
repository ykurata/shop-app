'use strict';
module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('Item', {
    userId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    category: DataTypes.STRING,
    price: DataTypes.DECIMAL(10, 2),
    image: DataTypes.ARRAY(DataTypes.STRING)
  }, {});
  Item.associate = function (models) {
    Item.belongsTo(models.User, {
      onDelete: "CASCADE",
      foreignKey: 'userId'
    });
    Item.hasMany(models.Conversation, { onDelete: "CASCADE", foreignKey: 'itemId' });
  };
  return Item;
};
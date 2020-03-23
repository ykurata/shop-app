'use strict';
module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('Item', {
    userId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    category: DataTypes.STRING,
    price: DataTypes.FLOAT
  }, {});
  Item.associate = function(models) {
    Item.belongsTo(models.User, {
      onDelete: "CASCADE",
      foreignKey: 'userId' 
    });
  };
  return Item;
};
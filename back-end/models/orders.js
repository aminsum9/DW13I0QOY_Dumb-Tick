'use strict';
module.exports = (sequelize, DataTypes) => {
  const orders = sequelize.define('orders', {
    quantity: DataTypes.INTEGER,
    totalPrice: DataTypes.INTEGER,
    status: DataTypes.STRING,
    attachment: DataTypes.STRING,
    event_id: DataTypes.INTEGER
  }, {});
  orders.associate = function(models) {
    // associations can be defined here
  };
  return orders;
};
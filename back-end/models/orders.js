"use strict";
module.exports = (sequelize, DataTypes) => {
  const orders = sequelize.define(
    "orders",
    {
      quantity: DataTypes.INTEGER,
      totalPrice: DataTypes.INTEGER,
      status: DataTypes.STRING,
      attachment: DataTypes.STRING,
      event_id: DataTypes.INTEGER,
      buyer_id: DataTypes.INTEGER
    },
    {}
  );
  orders.associate = function(models) {
    orders.belongsTo(models.events, {
      foreignKey: "event_id",
      sourceKey: "id"
    });
    orders.belongsTo(models.users, {
      foreignKey: "buyer_id",
      sourceKey: "id"
    });
  };
  return orders;
};

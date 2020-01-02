"use strict";
module.exports = (sequelize, DataTypes) => {
  const events = sequelize.define(
    "events",
    {
      title: DataTypes.STRING,
      startTime: DataTypes.DATE,
      endTime: DataTypes.DATE,
      price: DataTypes.INTEGER,
      description: DataTypes.TEXT,
      address: DataTypes.TEXT,
      urlMap: DataTypes.TEXT,
      image: DataTypes.TEXT,
      category_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER
    },
    {}
  );
  events.associate = function(models) {
    events.belongsTo(models.categories, {
      foreignKey: "category_id",
      sourceKey: "id"
    });
    events.belongsTo(models.users, {
      foreignKey: "category_id",
      as: "createdBy",
      sourceKey: "id"
    });
    events.hasMany(models.orders, {
      foreignKey: "event_id",
      sourceKey: "id"
    });
  };
  return events;
};

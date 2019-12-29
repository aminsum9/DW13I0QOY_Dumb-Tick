"use strict";
module.exports = (sequelize, DataTypes) => {
  const events = sequelize.define(
    "events",
    {
      title: DataTypes.STRING,
      startTime: DataTypes.INTEGER,
      endTime: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
      desctiption: DataTypes.TEXT,
      address: DataTypes.TEXT,
      urlmaps: DataTypes.TEXT,
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
  };
  return events;
};

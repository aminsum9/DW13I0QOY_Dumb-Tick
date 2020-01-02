"use strict";
module.exports = (sequelize, DataTypes) => {
  const favorite = sequelize.define(
    "favorite",
    {
      user_id: DataTypes.INTEGER,
      event_id: DataTypes.INTEGER
    },
    {}
  );
  favorite.associate = function(models) {
    favorite.belongsTo(models.events, {
      foreignKey: "event_id",
      sourceKey: "id"
    });
    favorite.belongsTo(models.users, {
      foreignKey: "user_id",
      sourceKey: "id"
    });
  };
  return favorite;
};

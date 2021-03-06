"use strict";
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define(
    "users",
    {
      name: DataTypes.STRING,
      phone: DataTypes.INTEGER,
      email: DataTypes.STRING,
      image: DataTypes.STRING,
      role: DataTypes.INTEGER,
      username: DataTypes.STRING,
      password: DataTypes.STRING
    },
    {}
  );
  users.associate = function(models) {
    users.hasMany(models.events, {
      foreignKey: "user_id",
      as: "createdBy",
      sourceKey: "id"
    });
    users.hasMany(models.orders, {
      foreignKey: "buyer_id",
      sourceKey: "id"
    });
  };
  return users;
};

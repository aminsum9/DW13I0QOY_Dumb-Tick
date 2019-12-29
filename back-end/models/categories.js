"use strict";
module.exports = (sequelize, DataTypes) => {
  const categories = sequelize.define(
    "categories",
    {
      name: DataTypes.STRING
    },
    {}
  );
  categories.associate = function(models) {
    categories.hasMany(models.events, {
      foreignKey: "category_id",
      sourceKey: "id"
    });
  };
  return categories;
};

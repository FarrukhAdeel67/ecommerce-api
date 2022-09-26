"use strict";
const moment = require("moment");
module.exports = (sequelize, DataTypes) => {
  const UserShop = sequelize.define("user_shops", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    shopkeeper_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shop_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fk_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  UserShop.beforeCreate((user_shop) => {
    user_shop.dataValues.createdAt = moment().unix();
    user_shop.dataValues.updatedAt = moment().unix();
  });
  UserShop.beforeUpdate((user_shop) => {
    user_shop.dataValues.updatedAt = moment().unix();
  });
  return UserShop;
};

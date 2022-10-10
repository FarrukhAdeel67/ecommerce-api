"use strict";
const moment = require("moment");

module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define("orders", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    fk_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fk_product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fk_shop_id: {
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

  Order.beforeCreate((order) => {
    order.dataValues.createdAt = moment().unix();
    order.dataValues.updatedAt = moment().unix();
  });
  Order.beforeUpdate((order) => {
    order.dataValues.updatedAt = moment().unix();
  });
  return Order;
};
"use-strict";
const moment = require("moment");
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("products", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fk_shop_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    discription: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    updatedAt: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });
  Product.beforeCreate((product) => {
    product.dataValues.createdAt = moment().unix();
    product.dataValues.updatedAt = moment().unix();
  });
  Product.beforeUpdate((product) => {
    product.dataValues.updatedAt = moment().unix();
  });
  return Product;
};

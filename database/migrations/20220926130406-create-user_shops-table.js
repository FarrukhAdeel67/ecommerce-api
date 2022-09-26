"use strict";

const { DataTypes } = require("sequelize");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("user_shops", {
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
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("user_shops");
  },
};

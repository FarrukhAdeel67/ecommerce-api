
const { random, indexOf } = require("lodash");
const { Users, sequelize, UserOtps } = require("../models");
const moment = require("moment");
const jwt = require("jsonwebtoken");
const config = require("../config");
module.exports = {
  signUp: async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
      const { name, phoneNumber } = req.body;
      if (!name || !phoneNumber) {
        throw { status: 400, message: "Required fields cannot be empty" };
      }
      const phoneNumberFound = await Users.findOne({
        where: {
          phone_number: phoneNumber,
        },
        transaction,
      });
      if (phoneNumberFound) {
        throw { status: 409, message: "Phone Number already exists" };
      }
      let user = await Users.create(
        {
          name,
          phone_number: phoneNumber,
        },
        { transaction }
      );
      const otp = Math.floor(Math.random() * 1000000);
      const userOtp = await UserOtps.create(
        {
          otp,
          fk_user_id: user.id,
        },
        { individualHooks: true, transaction }
      );
      await transaction.commit();
      res.status(200).send({ user, userOtp });
    } catch (err) {
      console.log(err);
      await transaction.rollback();
      return res
        .status(err.status || 500)
        .message(err.message || "Something went wrong...");
    }
  },
  verifyOtp: async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
      let { user } = req;
      const { otp } = req.body;
      if (otp.toString().length != 6) {
        throw { error: 400, message: "OTP must be a 6 digits number " };
      }
      const verifyOtp = await UserOtps.findOne({
        where: {
          otp,
          fk_user_id: user.id,
        },
        order: [["createdAt", "DESC"]],
        transaction,
      });
      if (moment().unix() > verifyOtp.expiry) {
        throw { error: 403, message: "OTP is expired" };
      }
      if (user.phone_number_verified === false) {
        user = await user.update(
          {
            phone_number_verified: true,
          },
          transaction
        );
      }
      const token = jwt.sign({ user }, config.get("jwt_secret"));
      await transaction.commit();
      res.status(200).send({ token, user });
    } catch (err) {
      console.log(err);
      await transaction.rollBack();
      res
        .status(err.status || 500)
        .message(err.message || "Something went wrong...");
    }
  },
  get: async (req, res) => {
    try {
      const users = await Users.findAll();
      return res.status(200).send({ users });
    } catch (err) {
      console.log(err);
      return res
        .status(err.status || 500)
        .message(err.message || "Something went wrong...");
    }
  },
  update: async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
      const { name } = req.body;
      const { userId } = req.params;
      const user = await Users.findByPk(userId);
      if (!user) {
        throw { status: 409, message: "User doesn't exist" };
      }
      let updatedUser = await Users.update(
        {
          name: name ? name : user.name,
        },
        {
          where: { id: userId },
        },

        { transaction }
      );
      await transaction.commit();
      res.status(200).send({
        updatedUser,
      });
    } catch (err) {
      console.log(err);
      await transaction.rollback();
      return res
        .status(err.status || 500)
        .message(err.message || "Something went wrong...");
    }
  },
};

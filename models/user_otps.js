"use strict";
const moment = require("moment");
module.exports = (sequelize, DataTypes) => {
  const UserOtp = sequelize.define("user_otps", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    otp: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fk_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    expiry: {
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
  UserOtp.beforeValidate((user_otp) => {
    user_otp.dataValues.expiry = moment().unix() + 300;
  });
  UserOtp.beforeCreate((user_otp) => {
    user_otp.dataValues.createdAt = moment().unix();
    user_otp.dataValues.updatedAt = moment().unix();
  });
  UserOtp.beforeUpdate((user_otp) => {
    user_otp.dataValues.updatedAt = moment().unix();
  });
  return UserOtp;
};


// "use strict";
// const moment = require("moment");
// const user = require("../controllers/user");

// module.exports = (sequelize, DataTypes)=>{
//     const UserShop = sequelize.define("user_shopes",{
//         id: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//             autoIncrement: true,
//             primaryKey: true,
//         },
//         shopkeeper_name: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },
//         shop_name: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },
//         fk_user_id: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//         },
//         createdAt: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//         },
//         updatedAt: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//         },
//     })

//     UserShop.beforeCreate(async(user_shopes)=>{
//         user_shopes.createdAt = moment().unix();
//         user_shopes.updatedAt = moment().unix();
//     })
//     UserShop.beforeUpdate(async(user_shopes)=>{
//         user_shopes.updatedAt = moment().unix();
//     })
//     return UserShop;
// }
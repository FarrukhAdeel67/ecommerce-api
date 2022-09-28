const { sequelize, UserShops, Users } = require("../models");
module.exports = {
  shop: async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
      const { user } = req;
      const { shop_name } = req.body;
      const shopNameFound = await UserShops.findOne({
        where: {
          shop_name: shop_name,
        },
        transaction,
      });
      if (shopNameFound) {
        throw {
          status: 409,
          message: "Shop Name already exists. Please give it some other name",
        };
      }
      const createShop = await UserShops.create(
        {
          shopkeeper_name: user.name,
          shop_name: shop_name,
          fk_user_id: user.id,
        },
        { transaction }
      );
      await transaction.commit();
      res.status(200).send({ createShop });
    } catch (err) {
      console.log(err);
      await transaction.rollBack();
      res
        .status(err.status || 500)
        .message(err.message || "Something went wrong...");
    }
  },
  getShop: async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
      let { user } = req;
      const { shopId } = req.params;
      console.log(user.id);
      console.log(shopId);
      const shopFound = await UserShops.findOne({
        where: {
          fk_user_id: user.id,
          id: shopId,
        },
        transaction,
      });
      if (!shopFound) {
        throw { status: 409, message: "Shop does not belong to this user." };
      }
      await transaction.commit();
      res.status(200).send({ shopFound });
    } catch (err) {
      console.log(err);
      await transaction.rollBack();
      return res
        .status(err.status || 500)
        .send(err.message || "something went wrong....");
    }
  },
};

const { sequelize, UserShops, Users, Orders, Products } = require("../models");
const user = require("./user");
module.exports = {
  createOrder: async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
      const {product} = req;
      const { user } = req;
      const { shop } = req;
      const data = await Orders.create({
        fk_user_id: user.id,
        fk_product_id: product.id,
        fk_shop_id: shop.id,
      })
      await transaction.commit();
      res.status(201).send({ data });
    } catch (err) {
      console.log(err);
      await transaction.rollBack();
      res
        .status(err.status || 500)
        .message(err.message || "Something went wrong...");
    }
  },
}
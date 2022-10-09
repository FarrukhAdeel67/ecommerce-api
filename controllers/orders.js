const { sequelize, UserShops, Users, Orders, Products } = require("../models");
const user = require("./user");
module.exports = {
  createOrder: async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
      const {fk_product_id} = req.body;
      const { user } = req;
      const { shop } = req;
      const product = await Products.findByPk(fk_product_id);
      if (!product) {
        throw { error: 500, message: "Products does not exist..." };
      }
      if (product.fk_shop_id !== shop.id) {
        throw { status: 409, message: "Product does not belong to that shop." };
      }
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
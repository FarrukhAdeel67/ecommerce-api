const { sequelize , Products} = require("../models");

module.exports = {
  postProduct: async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
      const {name, price, discription} = req.body;
      let {shop} = req;
      console.log(Products)
      console.log(shop.id);
      const product = await Products.create({
        name,
        price,
        discription,
        fk_shop_id: shop.id,
      },transaction);
      await transaction.commit();
      res.status(200).send({product});
    } catch (err) {
      console.log(err);
      await transaction.rollBack();
      return res
        .status(err.status || 500)
        .message(err.message || "something went wrong");
    }
  },
};

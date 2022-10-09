const { Products } = require("../models");
module.exports = async (req, res, next) => {
  const { fk_product_id } = req.body;
  try {
    const product = await Products.findByPk(fk_product_id);
    if (!product) {
      throw { error: 500, message: "Products does not exist..." };
    }
    req.product = product;
    next();
  } catch (err) {
    console.log(err);
    return res
      .status(err.status || 500)
      .send(err.message || "Something went wrong");
  }
};
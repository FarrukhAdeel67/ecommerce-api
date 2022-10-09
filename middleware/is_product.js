const { Products } = require("../models");
module.exports = async (req, res, next) => {
  const { productId } = req.params;
  try {
    const product = await Products.findByPk(productId);
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
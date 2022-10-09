module.exports = async (req, res, next) => {
    try {
      const { product } = req;
      if (product.fk_shop_id !== req.shop.id) {
        throw { status: 409, message: "Product does not belong to that shop." };
      }
      next();
    } catch (err) {
      console.log(err);
      return res
        .status(err.status || 500)
        .send(err.message || "Something went wrong");
    }
  };
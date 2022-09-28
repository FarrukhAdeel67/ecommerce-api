const { UserShops } = require("../models");
module.exports = async (req, res, next) => {
  const { shopId } = req.params;
  try {
    const shop = await UserShops.findByPk(shopId);
    if (!shop) {
      throw { error: 500, message: "Shop does not exist..." };
    }
    req.shop = shop;
    next();
  } catch (err) {
    console.log(err);
    return res
      .status(err.status || 500)
      .send(err.message || "Something went wrong");
  }
};

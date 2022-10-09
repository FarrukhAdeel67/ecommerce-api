const { Router } = require("express");
const router = Router();
const controller = require("../controllers/shops");
const productController = require("./products");
const isShop = require("../middleware/is_shop");
const orderRoute = require("./order");

router.post("/shops", controller.shop);
router.get("/shops/:shopId", isShop, controller.getShop);
router.use("/shops/:shopId", isShop, productController);
router.use("/shops/:shopId/orders", isShop, orderRoute);

module.exports = router;

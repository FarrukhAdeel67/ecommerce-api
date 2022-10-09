const router = require("express").Router();

const controller = require("../controllers/orders");
const checkProduct = require("../middleware/checkProduct");
const isProduct = require("../middleware/is_product");

router.post("/", isProduct, checkProduct, controller.createOrder);


module.exports = router;
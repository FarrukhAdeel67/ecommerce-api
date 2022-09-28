const { Router } = require("express");
const router = Router();
const controller = require("../controllers/products");
router.post("/products", controller.postProduct);

module.exports = router;

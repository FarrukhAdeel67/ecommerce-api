const router = require("express").Router();

const controller = require("../controllers/orders");

router.post("/", controller.createOrder);


module.exports = router;
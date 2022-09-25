const { Router } = require("express");
const router = Router();

// Controllers
const controller = require("../controllers/user");

router.use("/", controller.signUp);

module.exports = router;

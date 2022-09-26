const { Router } = require("express");
const router = Router();

// Controllers
const controller = require("../controllers/user");
const isUser = require("../middleware/is_user");

router.post("/", controller.signUp);
router.put("/:userId", isUser, controller.update);
router.put("/:userId/verifyOtp", isUser, controller.verifyOtp);
router.post("/:userId/shops", controller.shop);

module.exports = router;

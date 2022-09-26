const { Router } = require("express");
const router = Router();

// Controllers
const controller = require("../controllers/user");

router.post("/", controller.signUp);
router.put("/:userId", controller.update);

module.exports = router;

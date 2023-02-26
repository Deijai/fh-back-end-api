const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validateFields");
const { validateToken } = require("../middlewares/validateToken");

//import controller
const authController = require("../controllers/authController");

const router = Router();

router.post(
  "/",
  [
    check("email", "E-mail é obrigatorio").isEmail(),
    check("password", "Password é obrigatorio").not().isEmpty(),
    validateFields,
  ],
  authController.login
);

router.post(
  "/google",
  [
    check("token", "Token é obrigatorio").not().isEmpty(),
    validateFields,
  ],
  authController.google
);

router.get(
  "/renew",
  validateToken,
  authController.renewToken
);

module.exports = router;

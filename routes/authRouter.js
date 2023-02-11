const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validateFields");

//import controller user
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

module.exports = router;

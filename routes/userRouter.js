const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validateFields");
const { validateToken } = require("../middlewares/validateToken");

//import controller
const userController = require("../controllers/userController");

const router = Router();

router.get("/", validateToken, userController.getUsers);
router.post(
  "/new",
  [
    validateToken,
    check("name", "Name é obrigatorio").not().isEmpty(),
    check("password", "Password é obrigatorio").not().isEmpty(),
    check("email", "E-mail é obrigatorio").isEmail(),
    validateFields,
  ],
  userController.createUser
);
router.put(
  "/update/:id",
  [
    validateToken,
    check("name", "Name é obrigatorio").not().isEmpty(),
    check("role", "Role é obrigatorio").not().isEmpty(),
    validateFields,
  ],
  userController.updateUser
);
router.delete("/delete/:id", validateToken, userController.deleteUser);

module.exports = router;

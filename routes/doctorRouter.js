const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validateFields");
const { validateToken } = require("../middlewares/validateToken");

//import controller
const doctorController = require("../controllers/doctorController");

const router = Router();

router.get("/", validateToken, doctorController.getDoctors);

router.post(
  "/new",
  [
    validateToken,
    check("name", "Name é obrigatorio").not().isEmpty(),
    check("hospitals", "Hospital é obrigatorio").not().isEmpty(),
    check("hospitals.*._id", "O Id do hospital tem que ser válido").isMongoId(),
    validateFields,
  ],
  doctorController.createDoctor
);

router.put("/update/:id", validateToken, doctorController.updateDoctor);
router.delete("/delete/:id", validateToken, doctorController.deleteDoctor);

module.exports = router;

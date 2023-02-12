const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validateFields");
const { validateToken } = require("../middlewares/validateToken");

//import controller
const hospitalController = require("../controllers/hospitalController");

const router = Router();

router.get("/", validateToken, hospitalController.getHospitals);

router.post(
  "/new",
  [
    validateToken,
    check("name", "Name é obrigatorio").not().isEmpty(),
    validateFields,
  ],
  hospitalController.createHospital
);

router.put("/update/:id",  [
  validateToken,
  check("name", "Name é obrigatorio").not().isEmpty(),
  validateFields,
], hospitalController.updateHospital);
router.delete(
  "/delete/:id",
  validateToken,
  hospitalController.deleteHospital
);

module.exports = router;

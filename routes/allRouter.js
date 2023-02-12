const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validateFields");
const { validateToken } = require("../middlewares/validateToken");

//import controller
const allController = require("../controllers/allController");

const router = Router();

router.get(
  "/all/:param",
  [
    validateToken,
  ],
  allController.getAll
);

router.get(
    "/one/:collection/:param",
    [
      validateToken,
    ],
    allController.getOne
  );

module.exports = router;

const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validateFields");
const { validateToken } = require("../middlewares/validateToken");
const fileUpload = require('express-fileupload');

//import controller
const uploadController = require("../controllers/uploadController");

const router = Router();

//Default options
router.use(fileUpload());

router.put(
    "/:collection/:id",
    validateToken,
    uploadController.upload
  );

  router.get('/:collection/:image', uploadController.getImage)

module.exports = router;

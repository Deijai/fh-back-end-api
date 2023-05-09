const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validateFields");
const { validateToken } = require("../middlewares/validateToken");

//import controller
const clientController = require("../controllers/clientController");

const router = Router();

router.get("/", //validateToken, 
clientController.getClients);
router.get("/diff/:id", //validateToken, 
clientController.getClients);
router.post(
  "/new",
  [
    //validateToken,
    check("name", "Name é obrigatorio").not().isEmpty(),
    check("age", "Age é obrigatorio").not().isEmpty(),
    check("occupation", "Occupation é obrigatorio").not().isEmpty(),
    validateFields,
  ],
  clientController.createClient
);
router.patch(
  "/delete",
  clientController.deleteClient
);
module.exports = router;

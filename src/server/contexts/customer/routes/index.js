const { Router } = require("express");
const router = Router();

// -> controllers
const { CreateCustomerController } = require('../controllers/CreateCustomerController')
const { GetAllCustomersController } = require('../controllers/GetAllCustomersController')
const { GetCustomerController } = require('../controllers/GetCustomerController')
const { UpdateCustomerController } = require('../controllers/UpdateCustomerController')
const { DeleteCustomerController } = require('../controllers/DeleteCustomerController')

// -> controllers' instances
const createCustomerController = CreateCustomerController.init()
const getAllCustomersController = GetAllCustomersController.init()
const getCustomerController = GetCustomerController.init()
const updateCustomerController = UpdateCustomerController.init()
const deleteCustomerController = DeleteCustomerController.init()

const { CreateCustomerRequestValidator, CustomerValidator } = require("../middlewares");
const { idValidator } = require("../../../shared/middlewares");

// OK:
router.get("/", function (req, res, next) {
  getAllCustomersController.handler(req, res)
});

// OK:
router.get("/:id", idValidator, async function (req, res, next) {
  try {
    await getCustomerController.handler(req, res)
  }
  catch (e) {
    next(e)
  }
});

// OK:
router.post("/", CreateCustomerRequestValidator, async function (req, res, next) {
  try {
    await createCustomerController.handler(req, res)
  }
  catch (e) {
    next(e);
  }
});

// OK:
router.put("/:id", idValidator, CustomerValidator, async function (req, res, next) {  
  try {
    await updateCustomerController.handler(req, res)
  }
  catch (e) {
    next(e);
  }
});

router.delete("/:id", idValidator, async function (req, res, next) {
  try {
    await deleteCustomerController.handler(req, res)
  }
  catch (e) {
    next(e);
  }
});

module.exports = router;

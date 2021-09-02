const { Router } = require("express");
const router = Router();

const { CreateCustomerRequestValidator, CustomerValidator } = require("../middlewares");
const { idValidator } = require("../../../shared/middlewares");

const {
  createCustomerController,
  getCustomerController,
  getAllCustomersController,
  updateCustomerController,
  deleteCustomerController,
} = require("../controllers/Factory");

router.get("/", async function (request, response, next) {
  getAllCustomersController.handler(request, response).catch(next);
});

router.get("/:id", idValidator, async function (request, response, next) {
  getCustomerController.handler(request, response).catch(next);
});

router.post("/", CreateCustomerRequestValidator, async function (request, response, next) {
  createCustomerController.handler(request, response).catch(next);
});

router.put("/:id", idValidator, CustomerValidator, async function (request, response, next) {
  updateCustomerController.handler(request, response).catch(next);
});

router.delete("/:id", idValidator, async function (request, response, next) {
  deleteCustomerController.handler(request, response).catch(next);
});

module.exports = router;

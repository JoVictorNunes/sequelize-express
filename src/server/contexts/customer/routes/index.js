const { Router } = require("express");
const router = Router();

const {
  createCustomerController,
  getCustomerController,
  getAllCustomersController,
  updateCustomerController,
  deleteCustomerController,
} = require("../controllers/Factory");

const { CreateCustomerRequestValidator, CustomerValidator } = require("../middlewares");
const { idValidator } = require("../../../shared/middlewares");

// OK:
router.get("/", async function (req, res, next) {
  getAllCustomersController.handler(req, res).catch(next);
});

// OK:
router.get("/:id", idValidator, async function (req, res, next) {
  getCustomerController.handler(req, res).catch(next);
});

// OK:
router.post("/", CreateCustomerRequestValidator, async function (req, res, next) {
  createCustomerController.handler(req, res).catch(next);
});

// OK:
router.put("/:id", idValidator, CustomerValidator, async function (req, res, next) {
  updateCustomerController.handler(req, res).catch(next);
});

router.delete("/:id", idValidator, async function (req, res, next) {
  deleteCustomerController.handler(req, res).catch(next);
});

module.exports = router;

const { Router } = require("express");
const router = Router();

const { idValidator } = require("../../../shared/middlewares");
const { CreateCarRequestValidator } = require("../middlewares");

const {
  createCarController,
  getCarController,
  getAllCarsController,
  deleteCarController,
} = require("../controllers/Factory");

router.get("/", async function (request, response, next) {
  getAllCarsController.handler(request, response).catch(next);
});

router.get("/:id", idValidator, async function (request, response, next) {
  getCarController.handler(request, response).catch(next);
});

router.post("/", CreateCarRequestValidator, async function (request, response, next) {
  createCarController.handler(request, response).catch(next);
});

router.delete("/:id", idValidator, async function (request, response, next) {
  deleteCarController.handler(request, response).catch(next);
});

module.exports = router;

const { CarRepository } = require("../repository/CarRepository");

const { CreateCarService } = require("../services/CreateCarService");
const { GetAllCarsService } = require("../services/GetAllCarsService");
const { GetCarService } = require("../services/GetCarService");
const { DeleteCarService } = require("../services/DeleteCarService");

const { CreateCarController } = require("./CreateCarController");
const { GetAllCarsController } = require("./GetAllCarsController");
const { GetCarController } = require("./GetCarController");
const { DeleteCarController } = require("./DeleteCarController");

const repository = new CarRepository();

const createCarService = new CreateCarService(repository);
const getAllCarsService = new GetAllCarsService(repository);
const getCarService = new GetCarService(repository);
const deleteCarService = new DeleteCarService(repository);

const createCarController = new CreateCarController(createCarService);
const getAllCarsController = new GetAllCarsController(getAllCarsService);
const getCarController = new GetCarController(getCarService);
const deleteCarController = new DeleteCarController(deleteCarService);

module.exports = {
  createCarController,
  getAllCarsController,
  getCarController,
  deleteCarController,
};

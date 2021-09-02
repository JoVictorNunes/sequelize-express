const { CustomerRepository } = require("../repository/CustomerRepository");

const { CreateCustomerService } = require("../services/CreateCustomerService");
const { GetAllCustomersService } = require("../services/GetAllCustomersService");
const { GetCustomerService } = require("../services/GetCustomerService");
const { UpdateCustomerService } = require("../services/UpdateCustomerService");
const { DeleteCustomerService } = require("../services/DeleteCustomerService");

const { CreateCustomerController } = require("./CreateCustomerController");
const { GetAllCustomersController } = require("./GetAllCustomersController");
const { GetCustomerController } = require("./GetCustomerController");
const { UpdateCustomerController } = require("./UpdateCustomerController");
const { DeleteCustomerController } = require("./DeleteCustomerController");

const repository = new CustomerRepository();

const createCustomerService = new CreateCustomerService(repository);
const getAllCustomersService = new GetAllCustomersService(repository);
const getCustomerService = new GetCustomerService(repository);
const updateCustomerService = new UpdateCustomerService(repository);
const deleteCustomerService = new DeleteCustomerService(repository);

const createCustomerController = new CreateCustomerController(createCustomerService);
const getAllCustomersController = new GetAllCustomersController(getAllCustomersService);
const getCustomerController = new GetCustomerController(getCustomerService);
const updateCustomerController = new UpdateCustomerController(updateCustomerService);
const deleteCustomerController = new DeleteCustomerController(deleteCustomerService);

module.exports = {
  createCustomerController,
  getAllCustomersController,
  getCustomerController,
  updateCustomerController,
  deleteCustomerController,
};

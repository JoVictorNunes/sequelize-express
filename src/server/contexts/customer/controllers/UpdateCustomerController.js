const { CustomerRepository } = require("../repository/CustomerRepository");
const { UpdateCustomerService } = require("../services/UpdateCustomerService");

class UpdateCustomerController {
  #UpdateCustomerService;

  constructor(UpdateCustomerService) {
    this.#UpdateCustomerService = UpdateCustomerService;
  }

  static init() {
    const repository = new CustomerRepository();
    const service = new UpdateCustomerService(repository);
    const controller = new UpdateCustomerController(service);

    return controller;
  }

  async handler(request, response) {
    const { id } = request.params;
    const updatedCustomer = await this.#UpdateCustomerService.exec(id, request.body);

    return response.status(200).json({ updatedCustomer });
  }
}

module.exports = { UpdateCustomerController };

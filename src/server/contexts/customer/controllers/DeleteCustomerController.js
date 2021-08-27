const { CustomerRepository } = require("../repository/CustomerRepository");
const { DeleteCustomerService } = require("../services/DeleteCustomerService");

class DeleteCustomerController {
  #DeleteCustomerService;

  constructor(DeleteCustomerService) {
    this.#DeleteCustomerService = DeleteCustomerService;
  }

  static init() {
    const repository = new CustomerRepository();
    const service = new DeleteCustomerService(repository);
    const controller = new DeleteCustomerController(service);

    return controller;
  }

  async handler(request, response) {
    const { id } = request.params;
    await this.#DeleteCustomerService.exec(id);

    return response.status(200).json({ status: "Customer deleted!" });
  }
}

module.exports = { DeleteCustomerController };

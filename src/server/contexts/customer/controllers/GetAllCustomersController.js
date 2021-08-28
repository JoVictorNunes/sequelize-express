const { CustomerRepository } = require("../repository/CustomerRepository");
const { GetAllCustomersService } = require("../services/GetAllCustomersService");

class GetAllCustomersController {
  #GetAllCustomersService;

  constructor(GetAllCustomersService) {
    this.#GetAllCustomersService = GetAllCustomersService;
  }

  static init() {
    const repository = new CustomerRepository();
    const service = new GetAllCustomersService(repository);
    const controller = new GetAllCustomersController(service);

    return controller;
  }

  async handler(request, response) {
    const customers = await this.#GetAllCustomersService.exec();
    return response.status(200).json({ customers });
  }
}

module.exports = { GetAllCustomersController };

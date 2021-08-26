const { CustomerRepository } = require('../repository/CustomerRepository')
const { GetCustomerService } = require('../services/GetCustomerService')

class GetCustomerController {
  #GetCustomerService

  constructor(GetCustomerService) {
    this.#GetCustomerService = GetCustomerService
  }

  static init() {
    const repository = new CustomerRepository()
    const service = new GetCustomerService(repository)
    const controller = new GetCustomerController(service)

    return controller
  }

  async handler(request, response) {
    const { id } = request.params
    const customer = await this.#GetCustomerService.exec(id);
    return response.status(200).json({ customer });
  }
}

module.exports = { GetCustomerController }
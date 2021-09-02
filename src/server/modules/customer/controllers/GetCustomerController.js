class GetCustomerController {
  #GetCustomerService;

  constructor(GetCustomerService) {
    this.#GetCustomerService = GetCustomerService;
  }

  async handler(request, response) {
    const { id } = request.params;
    const customer = await this.#GetCustomerService.exec(id);
    return response.status(200).json({ customer });
  }
}

module.exports = { GetCustomerController };

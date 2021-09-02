class UpdateCustomerController {
  #UpdateCustomerService;

  constructor(UpdateCustomerService) {
    this.#UpdateCustomerService = UpdateCustomerService;
  }

  async handler(request, response) {
    const { id } = request.params;
    const updatedCustomer = await this.#UpdateCustomerService.exec(id, request.body);

    return response.status(200).json({ updatedCustomer });
  }
}

module.exports = { UpdateCustomerController };

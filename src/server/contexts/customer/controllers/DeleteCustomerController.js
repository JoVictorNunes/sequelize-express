class DeleteCustomerController {
  #DeleteCustomerService;

  constructor(DeleteCustomerService) {
    this.#DeleteCustomerService = DeleteCustomerService;
  }

  async handler(request, response) {
    const { id } = request.params;
    await this.#DeleteCustomerService.exec(id);

    return response.status(200).json({ status: "Customer deleted!" });
  }
}

module.exports = { DeleteCustomerController };

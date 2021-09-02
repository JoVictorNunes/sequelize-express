class GetAllCustomersController {
  #GetAllCustomersService;

  constructor(GetAllCustomersService) {
    this.#GetAllCustomersService = GetAllCustomersService;
  }

  async handler(request, response) {
    const customers = await this.#GetAllCustomersService.exec();
    return response.status(200).json({ customers });
  }
}

module.exports = { GetAllCustomersController };

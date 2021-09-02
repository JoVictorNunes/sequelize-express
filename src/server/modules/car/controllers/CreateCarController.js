class CreateCarController {
  #CreateCarService;

  constructor(CreateCarService) {
    this.#CreateCarService = CreateCarService;
  }

  async handler(request, response) {
    const { idCustomer: fk_id_customer, brand, model, license, year } = request.body;

    const car = await this.#CreateCarService.exec({ fk_id_customer, brand, model, license, year });

    return response.status(201).location(`${request.baseUrl}/${car.id}`).end();
  }
}

module.exports = { CreateCarController };

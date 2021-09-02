class GetAllCarsController {
  #GetAllCarsService;

  constructor(GetAllCarsService) {
    this.#GetAllCarsService = GetAllCarsService;
  }

  async handler(request, response) {
    const cars = await this.#GetAllCarsService.exec();
    return response.status(200).json({ cars });
  }
}

module.exports = { GetAllCarsController };

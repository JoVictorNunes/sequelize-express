class GetCarController {
  #GetCarService;

  constructor(GetCarService) {
    this.#GetCarService = GetCarService;
  }

  async handler(request, response) {
    const { id } = request.params;
    const car = await this.#GetCarService.exec(id);
    return response.status(200).json({ car });
  }
}

module.exports = { GetCarController };

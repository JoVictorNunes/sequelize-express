class DeleteCarController {
  #DeleteCarService;

  constructor(DeleteCarService) {
    this.#DeleteCarService = DeleteCarService;
  }

  async handler(request, response) {
    const { id } = request.params;
    await this.#DeleteCarService.exec(id);

    return response.status(200).json({ status: "Car deleted!" });
  }
}

module.exports = { DeleteCarController };

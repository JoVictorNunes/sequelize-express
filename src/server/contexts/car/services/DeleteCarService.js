class DeleteCarService {
  #CarRepository;

  constructor(CarRepository) {
    this.#CarRepository = CarRepository;
  }

  async exec(id) {
    const carExists = await this.#CarRepository.exists(id);

    if (!carExists) {
      throw new Error("Car does not exist!");
    }

    await this.#CarRepository.delete(id);
  }
}

module.exports = { DeleteCarService };

class GetCarService {
  #CarRepository;

  constructor(CarRepository) {
    this.#CarRepository = CarRepository;
  }

  async exec(id) {
    const car = await this.#CarRepository.getCar(id);

    if (!car) {
      throw new Error("Car does not exist!");
    }

    return car;
  }
}

module.exports = { GetCarService };

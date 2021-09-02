class GetAllCarsService {
  #CarRepository;

  constructor(CarRepository) {
    this.#CarRepository = CarRepository;
  }

  async exec() {
    const cars = await this.#CarRepository.getAll();
    return cars;
  }
}

module.exports = { GetAllCarsService };

class CreateCarService {
  #CarRepository;

  constructor(CarRepository) {
    this.#CarRepository = CarRepository;
  }

  async exec({ brand, model, license, year }) {
    // TODO: verificar se o carro já existe

    const car = await this.#CarRepository.create({ fk_id_customer, brand, model, license, year });
    return car;
  }
}

module.exports = { CreateCarService };

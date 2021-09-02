class CreateCustomerService {
  #CustomerRepository;

  constructor(CustomerRepository) {
    this.#CustomerRepository = CustomerRepository;
  }

  async exec({ name, cpf }, transaction) {
    // TODO: verificar se o cliente já existe

    const user = await this.#CustomerRepository.create({ name, cpf }, transaction);
    return user;
  }
}

module.exports = { CreateCustomerService };

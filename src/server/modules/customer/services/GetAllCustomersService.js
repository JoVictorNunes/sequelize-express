class GetAllCustomersService {
  #CustomerRepository;

  constructor(CustomerRepository) {
    this.#CustomerRepository = CustomerRepository;
  }

  async exec() {
    const users = await this.#CustomerRepository.getAll();
    return users;
  }
}

module.exports = { GetAllCustomersService };

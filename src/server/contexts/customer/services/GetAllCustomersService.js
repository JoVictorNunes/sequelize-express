class GetAllCustomersService {
  #CustomerRepository;

  constructor(CustomerRepository) {
    this.#CustomerRepository = CustomerRepository;
  }

  async exec() {
    const user = await this.#CustomerRepository.getAll();
    return user;
  }
}

module.exports = { GetAllCustomersService };

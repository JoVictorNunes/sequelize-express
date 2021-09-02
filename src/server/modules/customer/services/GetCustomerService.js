class GetCustomerService {
  #CustomerRepository;

  constructor(CustomerRepository) {
    this.#CustomerRepository = CustomerRepository;
  }

  async exec(id) {
    const customer = await this.#CustomerRepository.getCustomer(id);

    if (!customer) {
      throw new Error("Customer does not exist!");
    }

    return customer;
  }
}

module.exports = { GetCustomerService };

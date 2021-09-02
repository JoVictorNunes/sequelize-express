class DeleteCustomerService {
  #CustomerRepository;

  constructor(CustomerRepository) {
    this.#CustomerRepository = CustomerRepository;
  }

  async exec(id) {
    const customerExists = await this.#CustomerRepository.exists(id);

    if (!customerExists) {
      throw new Error("Customer does not exist!");
    }

    await this.#CustomerRepository.delete(id);
  }
}

module.exports = { DeleteCustomerService };

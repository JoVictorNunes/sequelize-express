class UpdateCustomerService {
  #CustomerRepository

  constructor(CustomerRepository) {
    this.#CustomerRepository = CustomerRepository
  }

  async exec(id, customerData) {
    const customerExists = await this.#CustomerRepository.exists(id)

    if (!customerExists) {
      throw new Error('Customer does not exist!')
    }

    const updatedCustomer = await this.#CustomerRepository.update(id, customerData)
    return updatedCustomer
  }
}

module.exports = { UpdateCustomerService }
class CreateCustomerService {
  #CustomerRepository

  constructor(CustomerRepository) {
    this.#CustomerRepository = CustomerRepository
  }

  async exec({ nome, cpf }, transaction) {
    // TODO: verificar se o cliente já existe

    const user = await this.#CustomerRepository.create({ nome, cpf }, transaction)
    return user
  }
}

module.exports = { CreateCustomerService }
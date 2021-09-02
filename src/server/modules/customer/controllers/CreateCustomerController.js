const { sequelize } = require("../../../../models");

class CreateCustomerController {
  #CreateCustomerService;

  constructor(CreateCustomerService) {
    this.#CreateCustomerService = CreateCustomerService;
  }

  async handler(request, response) {
    const {
      customer: { name, cpf },
      phones,
      cars,
    } = request.body;

    const createdCustomer = await sequelize.transaction(async (transaction) => {
      const customer = await this.#CreateCustomerService.exec({ name, cpf }, transaction);

      // TODO: implementar cadastro de telefones e carros

      return customer;
    });

    return response.status(201).location(`${request.baseUrl}/${createdCustomer.id}`).end();
  }
}

module.exports = { CreateCustomerController };

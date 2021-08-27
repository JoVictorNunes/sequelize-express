const { CustomerRepository } = require("../repository/CustomerRepository");
const { CreateCustomerService } = require("../services/CreateCustomerService");
const { sequelize } = require("../../../../models");

class CreateCustomerController {
  #CreateCustomerService;

  constructor(CreateCustomerService) {
    this.#CreateCustomerService = CreateCustomerService;
  }

  static init() {
    const repository = new CustomerRepository();
    const service = new CreateCustomerService(repository);
    const controller = new CreateCustomerController(service);

    return controller;
  }

  async handler(request, response) {
    const {
      customer: { nome, cpf },
      telefones,
      carros,
    } = request.body;

    const createdCustomer = await sequelize.transaction(async (transaction) => {
      const customer = await this.#CreateCustomerService.exec(
        { nome, cpf },
        transaction
      );

      // TODO: implementar cadastro de telefones e carros

      // if (telefones) {
      //   for (let telefone of telefones) {
      //     await Phone.create({
      //       ...telefone,
      //       fk_id_customer: customer.id,
      //     }, { transaction });
      //   }
      // }

      // if (carros) {
      //   for (let carro of carros) {
      //     await Car.create({
      //       ...carro,
      //       fk_id_customer: customer.id,
      //     }, { transaction });
      //   }
      // }

      return customer;
    });

    return response
      .status(201)
      .location(`${request.baseUrl}/${createdCustomer.id}`)
      .end();
  }
}

module.exports = { CreateCustomerController };

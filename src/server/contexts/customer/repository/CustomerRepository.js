const { sequelize } = require("../../../../models");
const { Customer } = sequelize.models;

class CustomerRepository {
  async exists(id) {
    const customer = await Customer.findOne({
      where: { id },
    });

    return !!customer;
  }

  async create({ name, cpf }, transaction) {
    const customer = await Customer.create({ name, cpf }, { transaction });
    return customer;
  }

  async getAll() {
    const customers = await Customer.findAll();
    return customers;
  }

  async getCustomer(id) {
    const customer = await Customer.findOne({
      where: { id },
    });

    return customer;
  }

  async delete(id) {
    await Customer.destroy({
      where: { id },
    });
  }

  async update(id, customerData) {
    const customer = await Customer.findOne({
      where: { id },
    });

    const updatedCustomer = await customer.update(customerData);
    return updatedCustomer;
  }
}

module.exports = { CustomerRepository };
